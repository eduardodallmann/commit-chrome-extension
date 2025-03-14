export function NoPageEmptyState() {
  return (
    <div className="text-center w-full p-5 h-full flex flex-col justify-center items-center">
      <i className="bx bxs-contact bx-lg mb-5 dark:text-white" />
      <p className="text-base mb-2 uppercase font-bold dark:text-white">
        Essa não é uma página de pull request
      </p>
      <span className="text-m text-slate-400 block mb-10 dark:text-slate-50">
        Por favor, abra uma página de pull request no Bitbucket
      </span>
    </div>
  );
}
