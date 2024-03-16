const DefaultLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="mx-auto max-w-3xl px-5 mb-5 flex flex-col gap-10">
      <main className="flex flex-col gap-10 py-8">{children}</main>
    </div>
  );
};

export default DefaultLayout;
