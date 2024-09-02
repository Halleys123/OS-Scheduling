import { AiFillLinkedin } from "react-icons/ai";
import { DiGithubBadge } from "react-icons/di";

import MiniIcon from "components/UI/MiniIcons";
import { memo } from "react";

const ProfileLinks = memo(function ProfileLinks() {
  return (
    <div className="flex flex-row self-stretch gap-6 mt-auto px-2 pt-12">
      <MiniIcon
        label="Contribute"
        href="https://github.com/Halleys123/OS-Scheduling"
        icon={<DiGithubBadge size={24} />}
      />
      <MiniIcon
        label="LinkedIn"
        href="https://www.linkedin.com/in/arnav-chhabra-51072316b/"
        icon={<AiFillLinkedin size={24} />}
      />
    </div>
  );
});

export default ProfileLinks;
