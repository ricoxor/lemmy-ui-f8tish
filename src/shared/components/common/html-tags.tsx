import { httpExternalPath } from "@utils/env";
import { htmlToText } from "html-to-text";
import { Component } from "inferno";
import { Helmet } from "inferno-helmet";
import { md } from "../../markdown";
import { I18NextService } from "../../services";

interface HtmlTagsProps {
  title: string;
  path: string;
  canonicalPath?: string;
  description?: string;
  image?: string;
}

/// Taken from https://metatags.io/
export class HtmlTags extends Component<HtmlTagsProps, any> {
  render() {
    const url = httpExternalPath(this.props.path);
    const canonicalUrl = this.props.canonicalPath ?? httpExternalPath(this.props.path);
    const desc = this.props.description;
    const image = this.props.image;

    return (
      <Helmet title={this.props.title}>
        <html lang={I18NextService.i18n.resolvedLanguage} />
        <meta name="ahrefs-site-verification" content="d8e719c0c5fa1fe366c1e31f8368e578723e3f8e820e0b2a87617f80a6e76472"></meta>
        {["title", "og:title", "twitter:title"].map(t => (
          <meta key={t} property={t} content={this.props.title} />
        ))}
        {["og:url", "twitter:url"].map(u => (
          <meta key={u} property={u} content={url} />
        ))}

        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />

        {/* Optional desc and images */}
        {["description", "og:description", "twitter:description"].map(
          n =>
            desc && (
              <meta
                key={n}
                name={n}
                content={htmlToText(md.renderInline(desc))}
              />
            ),
        )}
        {["og:image", "twitter:image"].map(
          p => image && <meta key={p} property={p} content={image} />,
        )}
      </Helmet>
    );
  }
}
