import { redirect } from "next/navigation";

export default function Home() {
  redirect("/admin/class_and_students/upcoming_classes");
}
