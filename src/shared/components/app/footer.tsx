import { Component } from "inferno";
import { GetSiteResponse } from "lemmy-js-client";
import { joinLemmyUrl } from "../../config";


interface FooterProps {
  site?: GetSiteResponse;
}

export class Footer extends Component<FooterProps, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  render() {
    return (
      <footer className="app-footer container-lg navbar navbar-expand-md navbar-light navbar-bg p-3">
        <div className="navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-link">
              f8ish.com - All rights reserved
            </li>
            <li className="nav-item">
              <a className="nav-link" href={joinLemmyUrl}>
                Created with Lemmy
              </a>
            </li>
          </ul>  
        </div> 
      </footer>
    );
  }
}
