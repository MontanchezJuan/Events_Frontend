import { IconBaseProps } from "react-icons";
import { MdOutlinePeople } from "react-icons/md";
import useStore from "../../../store/useStore";

export const Photo = ({ style, ...props }: IconBaseProps) => {
  const userProfile = useStore((store) => store.user.userProfile);

  if (userProfile) {
    return (
      <img
        className="rounded-full"
        style={
          style
            ? style
            : {
                width: "28px",
                height: "28px",
                objectFit: "cover",
                display: "block",
              }
        }
        src={userProfile.profilePhoto}
        alt={userProfile.name}
      />
    );
  }

  return <MdOutlinePeople {...props} />;
};
