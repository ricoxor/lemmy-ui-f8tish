import { PostView } from "lemmy-js-client";
import { UserService } from "../../services";

export default function nsfwCheck(
  pv: PostView,
  myUserInfo = UserService.Instance.myUserInfo,
): boolean {
  return false;
} 
