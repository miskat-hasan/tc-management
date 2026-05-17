import ClassDetails from "@/components/dashboard/client/ClassDetails";

const Page = ({ params }) => {
  const { id } = params;

  return (
    <>
      <ClassDetails id={id} />
    </>
  );
};

export default Page;
