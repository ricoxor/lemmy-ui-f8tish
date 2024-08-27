import { enableNsfw, setIsoData } from "@utils/app";
import { Component } from "inferno";
import { RouteComponentProps } from "inferno-router/dist/Route";
import {
  CreateCommunity as CreateCommunityI,
  GetSiteResponse,
} from "lemmy-js-client";
import { HttpService, I18NextService, UserService } from "../../services";
import { HtmlTags } from "../common/html-tags";
import { simpleScrollMixin } from "../mixins/scroll-mixin";
import { CommunityForm } from "./community-form";

interface CreateCommunityState {
  siteRes: GetSiteResponse;
  loading: boolean;
}

@simpleScrollMixin
export class CreateCommunity extends Component<
  RouteComponentProps<Record<string, never>>,
  CreateCommunityState
> {
  private isoData = setIsoData(this.context);
  state: CreateCommunityState = {
    siteRes: this.isoData.site_res,
    loading: false,
  };
  constructor(props: any, context: any) {
    super(props, context);
    this.handleCommunityCreate = this.handleCommunityCreate.bind(this);
  }

  get documentTitle(): string {
    return `${I18NextService.i18n.t("create_community")} - ${
      this.state.siteRes.site_view.site.name
    }`;
  }

  render() {
    return (
      <div className="create-community container-lg">
        <HtmlTags
          title={this.documentTitle}
          path={this.context.router.route.match.url}
        />
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2 mb-4">
            <h1 className="h4 mb-4">
              {I18NextService.i18n.t("create_community")}
            </h1>
            <CommunityForm
              onUpsertCommunity={this.handleCommunityCreate}
              enableNsfw={enableNsfw(this.state.siteRes)}
              allLanguages={this.state.siteRes.all_languages}
              siteLanguages={this.state.siteRes.discussion_languages}
              communityLanguages={this.state.siteRes.discussion_languages}
              loading={this.state.loading}
            />
          </div>
        </div>
      </div>
    );
  }

  async handleCommunityCreate(form: CreateCommunityI) {
    this.setState({ loading: true });

    const res = await HttpService.client.createCommunity(form);

    if (res.state === "success") {
      const myUser = UserService.Instance.myUserInfo!;
      UserService.Instance.myUserInfo?.moderates.push({
        community: res.data.community_view.community,
        moderator: myUser.local_user_view.person,
      });
      const name = res.data.community_view.community.name;
      this.props.history.replace(`/r/${name}`);
    } else {
      this.setState({ loading: false });
    }
  }
}
