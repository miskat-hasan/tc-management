"use client";

import { useState } from "react";
import { FileManager } from "@cubone/react-file-manager";
import "@cubone/react-file-manager/dist/style.css";
// import { IFile } from "@cubone/react-file-manager/dist/types/interfaces"; // Type import

const Page = () => {
  const [files, setFiles] = useState([
    {
      name: "Documents",
      isDirectory: true,
      path: "/Documents",
      updatedAt: "2024-09-09T10:30:00Z",
    },
    {
      name: "Pictures",
      isDirectory: true,
      path: "/Pictures",
      updatedAt: "2024-09-09T11:00:00Z",
    },
    {
      name: "Old pictures",
      isDirectory: true,
      path: "/Pictures/Old pictures",
      updatedAt: "2024-09-09T11:00:00Z",
    },
    {
      name: "Pic.png",
      isDirectory: false,
      path: "/Pictures/Pic.png",
      updatedAt: "2024-09-08T16:45:00Z",
      size: 2048,
    },
    {
      name: "report.pdf",
      isDirectory: false,
      path: "/Documents/report.pdf",
      updatedAt: "2024-09-07T14:20:00Z",
      size: 102400,
    },
  ]);

  // State to control the currently viewed path
  const [currentPath, setCurrentPath] = useState("/");

  // --- Create ---
  const handleCreate = (name) => {
    // <-- CHANGED: from 'item' to 'name'
    console.log("Creating folder with name:", name);

    // Manually construct the new path based on the current path
    const newPath = currentPath === "/" ? `/${name}` : `${currentPath}/${name}`;

    const newItem = {
      name: name,
      isDirectory: true, // We know it's a folder because 'onCreateFolder' was called
      path: newPath,
      updatedAt: new Date().toISOString(),
      size: undefined, // Folders don't have a size
    };

    console.log("Creating new item:", newItem);
    setFiles((currentFiles) => [...currentFiles, newItem]);
    // API call: await api.createFile(newItem)
  };

  // --- Delete ---
  const handleDelete = (items) => {
    console.log("Deleting:", items);
    const pathsToDelete = new Set(items.map((item) => item.path));

    setFiles((currentFiles) =>
      currentFiles.filter((file) => {
        if (pathsToDelete.has(file.path)) return false;
        for (const deletedItem of items) {
          if (
            deletedItem.isDirectory &&
            file.path.startsWith(deletedItem.path + "/")
          ) {
            return false;
          }
        }
        return true;
      })
    );
    // API call: await api.deleteFiles(items.map(item => item.path))
  };

  // --- Rename ---
  const handleRename = (item, newName) => {
    console.log("Renaming:", item, "to", newName);
    const oldPath = item.path;
    const newPath =
      oldPath.substring(0, oldPath.lastIndexOf("/") + 1) + newName;

    setFiles((currentFiles) =>
      currentFiles.map((file) => {
        if (file.path === oldPath) {
          return {
            ...file,
            name: newName,
            path: newPath,
            updatedAt: new Date().toISOString(),
          };
        }
        if (item.isDirectory && file.path.startsWith(oldPath + "/")) {
          const childRelativePath = file.path.substring(oldPath.length);
          return { ...file, path: newPath + childRelativePath };
        }
        return file;
      })
    );
    // API call: await api.renameFile(oldPath, newName)
  };

  // --- Move ---
  const handleMove = (itemsToMove, targetDirectory) => {
    console.log("Moving:", itemsToMove, "to", targetDirectory.path);
    const targetPath = targetDirectory.path;

    setFiles((currentFiles) =>
      currentFiles.map((file) => {
        // Find the item that needs to be moved
        const itemToMove = itemsToMove.find((item) => item.path === file.path);

        if (itemToMove) {
          // This is the item itself, update its path
          const newPath =
            targetPath === "/" ? `/${file.name}` : `${targetPath}/${file.name}`;
          return { ...file, path: newPath };
        }

        // Check if this file is a child of a directory being moved
        for (const movedItem of itemsToMove) {
          if (
            movedItem.isDirectory &&
            file.path.startsWith(movedItem.path + "/")
          ) {
            const relativePath = file.path.substring(movedItem.path.length);
            const newParentPath =
              targetPath === "/"
                ? `/${movedItem.name}`
                : `${targetPath}/${movedItem.name}`;
            return { ...file, path: newParentPath + relativePath };
          }
        }

        // Not affected
        return file;
      })
    );
    // API call: await api.moveFiles(itemsToMove.map(i => i.path), targetPath)
  };

  // --- Upload ---
  const handleUpload = (browserFiles, targetDirectory) => {
    console.log("Uploading:", browserFiles, "to", targetDirectory.path);

    // Convert browser File objects to your state's file structure
    const newFileEntries = browserFiles.map((file) => {
      const newPath =
        targetDirectory.path === "/"
          ? `/${file.name}`
          : `${targetDirectory.path}/${file.name}`;

      return {
        name: file.name,
        isDirectory: false,
        path: newPath,
        updatedAt: new Date().toISOString(),
        size: file.size,
      };
    });

    // Add the new files to state
    setFiles((currentFiles) => [...currentFiles, ...newFileEntries]);

    // API call: You would typically loop and upload each file
    // for (const file of browserFiles) {
    //   await api.upload(file, targetDirectory.path)
    // }
  };

  // --- Download ---
  const handleDownload = (file) => {
    console.log("Downloading:", file);
    // In a real app, you would trigger a download.
    // This is just a simulation.
    // e.g., window.location.href = `https://api.my-server.com/download?path=${file.path}`
    alert(`Simulating download for: ${file.name}`);
  };

  // --- Navigate ---
  const handleNavigate = (newPath) => {
    console.log("Navigating to:", newPath);
    // This controls the component's internal breadcrumbs and file view
    setCurrentPath(newPath);
    // If you were lazy-loading, you would fetch files for newPath here
    // e.g., api.getFiles(newPath).then(newFiles => setFiles(newFiles))
  };

  return (
    <>
      <FileManager
        files={files}
        path={currentPath} // Control the current path
        onNavigate={handleNavigate}
        // --- THIS IS THE FIX ---
        // Changed back to "onCreateFolder" as required by the error
        onCreateFolder={handleCreate}
        // -----------------------

        onDelete={handleDelete}
        onRename={handleRename}
        onMove={handleMove}
        onUpload={handleUpload}
        onDownload={handleDownload}
        // This prop shows the "Upload" and "New Folder" buttons
        capabilities={{
          canCreate: true,
          canDelete: true,
          canRename: true,
          canMove: true,
          canUpload: true,
          canDownload: true,
        }}
      />
    </>
  );
};

export default Page;
