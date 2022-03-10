import React, { useState, useEffect } from "react";

import Axios from "axios";
import { FormInput, PageBody } from "../../Components/FormInputs";
import PrimaryButton from "../../Components/Buttons";
import Heading from "../../Components/Heading";
import {
  ContentTab,
  EditableOption,
  TwoFAOption,
  ProfileTabLink,
  Tabs,
} from "../../Components/Profile";
import {
  countryOptions,
  birthDayOptions,
  birthMonthOptions,
  birthYearOptions,
  currentYear,
} from "../../Constants/Index";
import { InlineInput, StyledDropdown } from "../../Components/FormInputs";

const UpgradeInfo = () => {
  return (
    <PageBody>
      <div className="container pt-5">
        <Tabs>
          <ProfileTabLink href="/Profile/Basic">Basic</ProfileTabLink>
          <ProfileTabLink href="/Profile/Security">Security</ProfileTabLink>
          <ProfileTabLink href="/Profile/KYC">KYC</ProfileTabLink>
          <ProfileTabLink href="/Profile/PaymentMethods">
            Payment Methods
          </ProfileTabLink>
          <ProfileTabLink href="/Profile/AccountUpgrade">
            Account Upgrade
          </ProfileTabLink>
          <ProfileTabLink href="/Profile/UpgradeInfo" className="selected">
            Upgrade information
          </ProfileTabLink>
        </Tabs>
        <ContentTab className="text-white">
          <div className="d-flex p-4 row">
            <div className="d-flex col-12 col-md-6 mb-3 flex-column"></div>
          </div>
        </ContentTab>
      </div>
    </PageBody>
  );
};

export default UpgradeInfo;
