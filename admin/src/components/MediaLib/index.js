import React from 'react'
import PropTypes from 'prop-types'
import { prefixFileUrlWithBackendUrl, useLibrary } from "@strapi/helper-plugin";

const MediaLib = ({isOpen, onToggle, onChange}) => {

  const { components } = useLibrary();
  const MediaLibraryDialog = components["media-library"];
  const handleChangeAssets = (assets) => {
    onChange(assets)
    onToggle();
  };
  const handleSelectAssets = (files) => {
    const formattedFiles = files.map((f) => ({
      name: f.name,
      alt: f.alternativeText || f.name,
      url: prefixFileUrlWithBackendUrl(f.url),
      mime: f.mime,
      formats: f.formats
    }));

    handleChangeAssets(formattedFiles);
  };


  if (!isOpen) {
    return null;
  }

  return (
    <MediaLibraryDialog
      onClose={onToggle}
      onSelectAssets={handleSelectAssets}
    />
  );
}

MediaLib.defaultProps = {
    isOpen: false,
    onChange: () => {},
    onToggle: () => {},
  };
  
  MediaLib.propTypes = {
    isOpen: PropTypes.bool,
    onChange: PropTypes.func,
    onToggle: PropTypes.func,
  };

export default MediaLib
