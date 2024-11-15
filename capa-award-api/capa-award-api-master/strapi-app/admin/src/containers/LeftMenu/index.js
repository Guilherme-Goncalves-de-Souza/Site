import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import {
  LeftMenuLinksSection,
  LeftMenuFooter,
  LeftMenuHeader,
  LinksContainer,
} from '../../components/LeftMenu';
import Loader from './Loader';
import Wrapper from './Wrapper';
import useMenuSections from './useMenuSections';

const LeftMenu = ({ shouldUpdateStrapi, version, plugins, setUpdateMenu }) => {
  const location = useLocation();

  const {
    state: {
      isLoading,
      collectionTypesSectionLinks,
      singleTypesSectionLinks,
      generalSectionLinks,
      pluginsSectionLinks,
    },
    toggleLoading,
    generateMenu,
  } = useMenuSections(plugins, shouldUpdateStrapi);

  const filteredCollectionTypeLinks = collectionTypesSectionLinks.filter(
    ({ isDisplayed }) => isDisplayed
  );
  const filteredSingleTypeLinks = singleTypesSectionLinks.filter(({ isDisplayed }) => isDisplayed);

  // This effect is really temporary until we create the menu api
  // We need this because we need to regenerate the links when the settings are being changed
  // in the content manager configurations list
  useEffect(() => {
    setUpdateMenu(() => {
      toggleLoading();
      generateMenu();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var listGeneral = [];
  for(var item in generalSectionLinks) {
    if(generalSectionLinks[item].icon === "cog") {
        listGeneral.push(generalSectionLinks[item])
    }
  }

  var listPlugin = [];
console.log(process.env.NODE_ENV )
  // if(process.env.NODE_ENV == "production") {
      for(var item in pluginsSectionLinks) {
          console.log(pluginsSectionLinks[item])
          if(pluginsSectionLinks[item].icon !== "paint-brush") {
              listPlugin.push(pluginsSectionLinks[item])
          }
      }
  // } else {
  //   listPlugin = pluginsSectionLinks;

  // }

  return (
    <Wrapper>
      <Loader show={isLoading} />
      <LeftMenuHeader />
      <LinksContainer>
        {filteredCollectionTypeLinks.length > 0 && (
          <LeftMenuLinksSection
            section="collectionType"
            name="collectionType"
            links={filteredCollectionTypeLinks}
            location={location}
            searchable
          />
        )}
        {filteredSingleTypeLinks.length > 0 && (
          <LeftMenuLinksSection
            section="singleType"
            name="singleType"
            links={filteredSingleTypeLinks}
            location={location}
            searchable
          />
        )}

        {pluginsSectionLinks.length > 0 && (
          <LeftMenuLinksSection
            section="plugins"
            name="plugins"
            links={pluginsSectionLinks}
            location={location}
            searchable={false}
            emptyLinksListMessage="app.components.LeftMenuLinkContainer.noPluginsInstalled"
          />
        )}
        {listGeneral.length > 0 && (
          <LeftMenuLinksSection
            section="general"
            name="general"
            links={listGeneral}
            location={location}
            searchable={false}
          />
        )}
      </LinksContainer>
    </Wrapper>
  );
};

LeftMenu.propTypes = {
  shouldUpdateStrapi: PropTypes.bool.isRequired,
  version: PropTypes.string.isRequired,
  plugins: PropTypes.object.isRequired,
  setUpdateMenu: PropTypes.func.isRequired,
};

export default memo(LeftMenu);
