import "@/styles/globals.css";
import '../styles/forms.css';
import '../styles/button.css';
import '../styles/SideMenu.css';
import '../styles/message.css';
/**
 * The top-level Next.js component.
 *
 * @param {Object} props The component props
 * @param {React.Component} props.Component The page component
 * @param {Object} props.pageProps The page props
 * @returns {React.Component} The rendered page component
 */
export default function App({ Component, pageProps }) {
  // Render the page component with the page props
  return <Component {...pageProps} />;
}
