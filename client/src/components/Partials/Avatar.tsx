
export function Avatar({
  userId,
  username,
}: {
  userId: string;
  username: string;
}) {
  return (
    <div
      className={
        'flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 text-xl font-bold text-white'
      }
    >
      <span className="uppercase">{username[0]}</span>
    </div>
  );
}
