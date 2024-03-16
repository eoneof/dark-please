import './MyLink.css';

import React, { useEffect, useState } from 'react';

import { LinkElement } from '../../utils/constants.types.ts';

interface LinkProps {
  linkData: LinkElement;
}

const MyLink = ({ linkData }: LinkProps) => {
  const urlRegex = /(www|http:|https:)+[^\s]+[\w]/i;
  const isUrl = !!linkData.url.match(urlRegex);
  const [ isExternal, setIsExternal ] = useState(false);

  useEffect(() => {
    setIsExternal(isUrl);
  }, [isUrl]);

  return isExternal ? (
    <a className="link" href={linkData.url} target="_blank" rel="external noreferrer noopener"> {linkData.url} </a>
  ) : (<div className="paragraph">Nonsense</div>);
};

export default function App({user, id , title, link}) {
  const toggle = false;
  const linkElement: LinkElement = {
    title: title,
    url: link
  };

  const route: LinkElement = {
    title: 'Projects',
    url: '/projects',
  };

  const text = (
    <p>Hello, Dark Please!</p>
  )

  const linkData = toggle ? link : route;

  return <MyLink linkData={linkData} />;
}
