/**
 *
 * RelationModal
 *
 */

import React from 'react';
//import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import pluginId from '../../pluginId';

import BodyModal from '../../components/BodyModal';
import ButtonModalPrimary from '../../components/ButtonModalPrimary';
import ButtonModalSecondary from '../../components/ButtonModalSecondary';
import FooterModal from '../../components/FooterModal';
import HeaderModal from '../../components/HeaderModal';
import HeaderModalNavContainer from '../../components/HeaderModalNavContainer';
import HeaderNavLink from '../../components/HeaderNavLink';
import RelationBodyModal from '../../components/RelationBodyModal';
import WrapperModal from '../../components/WrapperModal';

import styles from './styles.scss';

const NAVLINKS = [{ id: 'base' }, { id: 'advanced' }];

function RelationModal({ attributeType, activeTab, isOpen, push }) {
  const handleToggle = () => {
    push({ search: '' });
  };

  const handleGoTo = to => {
    push({
      search: `modalType=attributeForm&attributeType=${attributeType}&settingType=${to}&actionType=create`,
    });
  };

  const renderNavLink = (link, index) => {
    return (
      <HeaderNavLink
        isActive={activeTab === link.id}
        key={link.id}
        {...link}
        onClick={handleGoTo}
        nextTab={index === NAVLINKS.length - 1 ? 0 : index + 1}
      />
    );
  };

  const handleSubmit = e => {
    e.preventDefault();

    // TODO - Send new relation
  };

  const renderModalBody = () => {
    return <RelationBodyModal />;
  };

  console.log(activeTab);

  return (
    <WrapperModal
      isOpen={isOpen}
      onToggle={handleToggle}
      className={styles.relationModal}
    >
      <HeaderModal>
        <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
          <FormattedMessage id={`${pluginId}.popUpForm.create`} />
          &nbsp;
          <span style={{ fontStyle: 'italic', textTransform: 'capitalize' }}>
            {attributeType}
          </span>
          &nbsp;
          <FormattedMessage id={`${pluginId}.popUpForm.field`} />
        </div>
        <HeaderModalNavContainer>
          {NAVLINKS.map(renderNavLink)}
        </HeaderModalNavContainer>
      </HeaderModal>
      <form onSubmit={handleSubmit}>
        <BodyModal>
          {/* {showForm && currentForm.map(this.renderInput)} */}

          {renderModalBody()}
        </BodyModal>
        <FooterModal>
          <ButtonModalSecondary
            message={`${pluginId}.form.button.cancel`}
            onClick={handleToggle}
          />
          <ButtonModalPrimary
            message={`${pluginId}.form.button.continue`}
            type="submit"
            add
          />
          <ButtonModalPrimary
            message={`${pluginId}.form.button.save`}
            type="button"
          />
        </FooterModal>
      </form>
    </WrapperModal>
  );
}

RelationModal.defaultProps = {
  activeTab: 'base',
  attributeType: 'string',
  isOpen: false,
  push: () => {},
};

RelationModal.propTypes = {
  activeTab: PropTypes.string,
  attributeType: PropTypes.string,
  isOpen: PropTypes.bool,
  push: PropTypes.func,
};

export default RelationModal;