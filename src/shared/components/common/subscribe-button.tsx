import classNames from "classnames";
import { NoOptionI18nKeys } from "i18next";
import { MouseEventHandler } from "inferno";
import { NavLink } from "inferno-router";
import { CommunityView } from "lemmy-js-client";
import { I18NextService, UserService } from "../../services";
import { Icon, Spinner } from "./icon";

interface SubscribeButtonProps {
  communityView: CommunityView;
  onFollow: MouseEventHandler;
  onUnFollow: MouseEventHandler;
  loading?: boolean;
  isLink?: boolean;
}

export function SubscribeButton({
  communityView: {
    subscribed,
    community: { actor_id },
  },
  onFollow,
  onUnFollow,
  loading = false,
  isLink = false,
}: SubscribeButtonProps) {
  let i18key: NoOptionI18nKeys;

  switch (subscribed) {
    case "NotSubscribed": {
      i18key = "subscribe";
      break;
    }
    case "Subscribed": {
      i18key = "joined";
      break;
    }
    default: {
      i18key = "subscribe_pending";
      break;
    }
  }

  const buttonClass = classNames(
    "btn",
    isLink ? "btn-link d-inline-block" : "d-block mb-2 w-100",
  );

  if (!UserService.Instance.myUserInfo) {
    return (
      <NavLink
        to="/login"
        className={classNames(buttonClass, {
          "btn-secondary": !isLink,
        })}
      >
        {I18NextService.i18n.t("subscribe")}
      </NavLink>
    );
  }

  return (
    <button
      type="button"
      className={classNames(buttonClass, {
        [`btn-${subscribed === "Pending" ? "warning" : "secondary"}`]: !isLink,
      })}
      onClick={subscribed === "NotSubscribed" ? onFollow : onUnFollow}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {subscribed === "Subscribed" && (
            <Icon icon="check" classes="icon-inline me-1" />
          )}
          {I18NextService.i18n.t(i18key)}
        </>
      )}
    </button>
  );
}
