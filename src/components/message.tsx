import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userImage, botImage } from "@/lib/utils";

type MessageProps = {
  input: string;
  userType: string;
};

export default function Message({ input, userType }: MessageProps) {
  return (
    <div
      className={`${
        userType == "user" ? "flex pl-14" : "flex flex-row-reverse pr-14"
      } gap-4 items-start justify-between w-full`}
    >
      <div className="p-2 grow bg-gray-700 border-2 border-gray-600 text-gray-200 rounded text-base font-normal">
        {input}
      </div>
      <Avatar>
        <AvatarImage src={userType == "user" ? userImage : botImage} />
        <AvatarFallback>SJ</AvatarFallback>
      </Avatar>
    </div>
  );
}
