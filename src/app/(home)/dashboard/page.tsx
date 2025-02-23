import { CreateForm } from "./_components/create-form";

type Props = {};

const DashboardPage = (props: Props) => {
  return (
    <div className="p-10 flex items-center justify-between">
      <h2 className="font-bold text-3xl">Dashboard</h2>
      <CreateForm />
    </div>
  );
};

export default DashboardPage;
