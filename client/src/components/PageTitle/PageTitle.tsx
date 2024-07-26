import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
  title: string;
}

const PageTitle: React.FC<Props> = ({ title }) => {
  const location = useLocation();

  useEffect(() => {
    document.title = title;
  }, [location, title]);

  return null; // This component doesn't render anything
};

export default PageTitle;
