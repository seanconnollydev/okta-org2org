import React from 'react';
import Head from 'next/head';

const OKTA_REDIRECT_URI = 'http://localhost:3001';

class Index extends React.Component {
  state = {
    login: null,
  };

  componentDidMount() {
    // eslint-disable-next-line no-undef
    this.signIn = new OktaSignIn({
      baseUrl: 'https://tangogroupspoke.okta.com',
      clientId: '0oa2cwiuiAA855oJG356',
      redirectUri: OKTA_REDIRECT_URI,
      authParams: {
        issuer: 'https://tangogroupspoke.okta.com/oauth2/default',
        responseType: ['id_token', 'token'],
        scopes: ['openid', 'email', 'profile'],
      },
    });

    if (this.signIn.token.hasTokensInUrl()) {
      this.signIn.token.parseTokensFromUrl(
        function success(res) {
          // The tokens are returned in the order requested by `responseType` above
          const accessToken = res[0];
          const idToken = res[1];

          // Say hello to the person who just signed in:
          console.log(`Hello, ${idToken.claims.email}`);

          // Save the tokens for later use, e.g. if the page gets refreshed:
          this.signIn.tokenManager.add('accessToken', accessToken);
          this.signIn.tokenManager.add('idToken', idToken);

          // Remove the tokens from the window location hash
          window.location.hash = '';
        },
        (err) => {
          // handle errors as needed
          console.error(err);
        },
      );
    } else {
      this.signIn.session.get((res) => {
        // Session exists, show logged in state.
        if (res.status === 'ACTIVE') {
          this.setState({ login: res.login });
        } else {
          // No session, show the login form
          this.signIn.renderEl(
            { el: '#okta-login-container' },
            (signInRes) => {
              console.log('signInRes', signInRes);
              // TODO: Experienced behavior differs from what actually happens.  The widget does not redirect the user to Okta.
              window.location.reload();

              // Nothing to do in this case, the widget will automatically redirect
              // the user to Okta for authentication, then back to this page if successful
            },
            (err) => {
              // handle errors as needed
              console.error(err);
            },
          );
        }
      });
    }
  }

  logout = () => {
    this.signIn.session.close(() => {
      window.location.reload(); // TODO: Do something more elegant than reload
    });
  }

  render() {
    const { login } = this.state;

    return (
      <React.Fragment>
        <Head>
          <script
            src="https://ok1static.oktacdn.com/assets/js/sdk/okta-signin-widget/2.13.0/js/okta-sign-in.min.js"
            type="text/javascript"
          />
          <link
            href="https://ok1static.oktacdn.com/assets/js/sdk/okta-signin-widget/2.6.0/css/okta-sign-in.min.css"
            type="text/css"
            rel="stylesheet"
          />

          <link
            href="https://ok1static.oktacdn.com/assets/js/sdk/okta-signin-widget/2.6.0/css/okta-theme.css"
            type="text/css"
            rel="stylesheet"
          />
        </Head>
        <h1>Spoke</h1>
        <div id="okta-login-container" />
        {login && (
        <div>
          You are logged in as:
          {login}
          <button type="button" onClick={this.logout}>Logout</button>
          <div>
            <a href="https://tangogroupspoke.okta.com/home/bookmark/0oa2cyeipbAT6eeC9356/2557">Go to Hub App</a>
          </div>
        </div>
        )}
      </React.Fragment>
    );
  }
}

export default Index;
