import React from "react";
import Container from "../../components/Container/Container";
import styles from "./styles.module.scss";

const PrivacyPolicy = () => {
  return (
    // Wrapping the component with a Container for consistent styling
    <Container>
      <div className={styles.container}>
        <h2>Privacy Policy</h2>
        <p>
          We take your privacy seriously and want you to feel comfortable using
          our products. This privacy policy outlines how we collect, use, and
          protect the information you provide to us through our website.
        </p>

        <h3>Information We Collect</h3>
        <p>
          When you visit our website or log into our games, we may collect
          certain information from you, including your username and email
          address. We use this information to provide you with our services and
          to communicate with you about your account.
        </p>
        <p>
          We also use Google Analytics to collect information about how visitors
          use our website. Google Analytics may collect information such as your
          IP address, browser type, and other details about your use of our
          website. We do not store or have access to any of this information.
        </p>

        <h3>Information Use</h3>
        <p>
          We use the information we collect to provide you with our services and
          to improve our website and offerings. We may also use the information
          for internal analytical purposes to better understand how our website
          and services are being used.
        </p>

        <h3>Information Sharing</h3>
        <p>
          We do not sell or share any player or customer data with any third
          parties other than what Google Analytics collects.
        </p>

        <h3>Data Security</h3>
        <p>
          We take data security seriously and use the most up-to-date security
          and coding standards to protect your information from unauthorized
          access, disclosure, or modification.
        </p>

        <h3>Changes to This Policy</h3>
        <p>
          We reserve the right to update or modify this privacy policy at any
          time. If we make significant changes, we will post a prominent notice
          on our website and, where appropriate, notify you by email. Your
          continued use of our website and services after any changes to this
          privacy policy will constitute your acceptance of the updated policy.
        </p>
      </div>
    </Container>
  );
};

export default PrivacyPolicy;
