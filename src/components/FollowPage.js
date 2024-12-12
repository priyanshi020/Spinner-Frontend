import React, { useEffect } from "react";

const FollowPage = () => {
  useEffect(() => {
    // Load Facebook SDK
    if (!window.FB) {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div style={styles.container}>
      <h2>Follow Us on Facebook</h2>
      {/* Facebook Follow Button */}
      <div
        className="fb-follow"
        data-href="https://www.facebook.com/yourpage"
        data-width="300"
        data-layout="button"
        data-size="large"
        data-show-faces="true"
      ></div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
};

export default FollowPage;
