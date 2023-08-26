import './MyLink.css';

import React, { useEffect, useState } from 'react';

import { LinkElement } from '../../utils/constants.types.ts';

interface LinkProps {
  linkData: LinkElement;
}

const MyLink = ({ linkData }: LinkProps) => {
  const urlRegex = /(www|http:|https:)+[^\s]+[\w]/i;
  const isUrl = !!linkData.url.match(urlRegex);
  const [isExternal, setIsExternal] = useState(false);

  useEffect(() => {
    setIsExternal(isUrl);
  }, [isUrl]);

  return isExternal ? (
    <a
      className="link"
      href={linkData.url}
      target="_blank"
      rel="external noreferrer noopener"
    >
      {linkData.url}
    </a>
  ) : (
    <a
      className="link nav-link nav-link_active"
      href={linkData.url}
      target="_blank"
      rel="external noreferrer noopener"
    >
      {linkData.url}
    </a>
  );
};

function App() {
  const toggle = false;
  const link: LinkElement = {
    label: 'Google',
    title: 'Go To Google',
    url: 'https://google.com',
  };

  const route: LinkElement = {
    label: 'Projects',
    url: '/projects',
  };
  const linkData = toggle ? link : route;

  return <MyLink linkData={linkData} />;
}

export default App;
