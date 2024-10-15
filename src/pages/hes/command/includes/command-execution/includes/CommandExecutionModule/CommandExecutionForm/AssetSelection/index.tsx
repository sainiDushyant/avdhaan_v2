import { FC, useCallback, useState } from 'react';
import Button from '@/components/ui/button';
import DeviceIdentifier from '@/components/customUI/hes/HesFilters/PrimaryFilters/DeviceIdentifier';
import AsyncMultiOptionSelect from '@/components/customUI/Select/AsyncMultiOptionSelect';
import useHesPrimaryFilterOptions from '@/hooks/hes/useHesPrimaryFilterOptions';
import { HigherOrderFilterType } from '../..';
import { cn } from '@/lib/utils';
import { HesFilterState } from '@/store/hes/types/records/device-management';
import { MultiValue } from 'react-select';
import { Option } from '@/store/vee/types/other';
import BaseModal from '@/components/customUI/Modals';
import UploadCSVfile from './includes/UploadCSVfile';
import Upload from '@/components/svg/Upload';

interface AssetSelectionProps {
  currentStep: number;
  selectedFilter: HigherOrderFilterType;
  primaryFilters: HesFilterState;
  setPrimaryFilters: React.Dispatch<React.SetStateAction<HesFilterState>>;
  setAssetsSelected: React.Dispatch<React.SetStateAction<HesFilterState>>;
  assetsSelected: HesFilterState;
  setSelectedFilter: React.Dispatch<
    React.SetStateAction<HigherOrderFilterType>
  >;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const UploadCsvButton = () => {
  return (
    <Button className="date-filter-color flex gap-2 self-end " type="button">
      <Upload /> Upload Meter CSV
    </Button>
  );
};

const AssetSelection: FC<AssetSelectionProps> = ({
  currentStep,
  selectedFilter,
  primaryFilters,
  setPrimaryFilters,
  setAssetsSelected,
  assetsSelected,
  setSelectedFilter,
  setCurrentStep
}) => {
  const [openCsvModal, setOpenCsvModal] = useState(false);

  const mainFilter =
    primaryFilters[`${selectedFilter}_id` as keyof HesFilterState];
  const meterSearchDisabled =
    selectedFilter === null ? false : mainFilter.length === 0;

  const { primaryFilterLoading, dtrOptions, feederOptions, pssOptions } =
    useHesPrimaryFilterOptions(primaryFilters);

  const handleChangeDeviceIdentifier = useCallback(
    (selected: MultiValue<Option>) => {
      setPrimaryFilters((prevData) => ({
        ...prevData,
        device_identifier: selected
      }));
    },
    []
  );
  const handleChangeDtr = useCallback((selected: MultiValue<Option>) => {
    setPrimaryFilters((prevData) => ({
      ...prevData,
      dtr_id: selected,
      device_identifier: []
    }));
  }, []);

  const handleChangeFeeder = useCallback((selected: MultiValue<Option>) => {
    setPrimaryFilters((prevData) => ({
      ...prevData,
      feeder_id: selected,
      dtr_id: [],
      device_identifier: []
    }));
  }, []);

  const handleChangePss = useCallback((selected: MultiValue<Option>) => {
    setPrimaryFilters((prevData) => ({
      ...prevData,
      pss_id: selected,
      feeder_id: [],
      dtr_id: [],
      device_identifier: []
    }));
  }, []);

  const handleAddClick = () => {
    setAssetsSelected((prevAssetsSelected) => ({
      ...prevAssetsSelected,
      // Merge device_identifier
      device_identifier: [
        ...prevAssetsSelected.device_identifier,
        ...primaryFilters.device_identifier.filter(
          (newDevice) =>
            !prevAssetsSelected.device_identifier.some(
              (existingDevice) => existingDevice.value === newDevice.value
            )
        )
      ],
      // Merge pss_id
      pss_id: [
        ...prevAssetsSelected.pss_id,
        ...primaryFilters.pss_id.filter(
          (newPss) =>
            !prevAssetsSelected.pss_id.some(
              (existingPss) => existingPss.value === newPss.value
            )
        )
      ],
      // Merge feeder_id
      feeder_id: [
        ...prevAssetsSelected.feeder_id,
        ...primaryFilters.feeder_id.filter(
          (newFeeder) =>
            !prevAssetsSelected.feeder_id.some(
              (existingFeeder) => existingFeeder.value === newFeeder.value
            )
        )
      ],
      // Merge dtr_id
      dtr_id: [
        ...prevAssetsSelected.dtr_id,
        ...primaryFilters.dtr_id.filter(
          (newDtr) =>
            !prevAssetsSelected.dtr_id.some(
              (existingDtr) => existingDtr.value === newDtr.value
            )
        )
      ]
    }));
  };

  return (
    <div className="mb-12">
      <div className="flex flex-1 flex-wrap gap-6 items-center justify-between mt-3 mb-5">
        <div className="flex items-center gap-x-12">
          <Button variant="ghost" className="flex gap-x-2" type="button">
            <div
              className={cn(
                'w-[40px] h-[40px] flex items-center justify-center bg-[#A3B2CF] rounded-sm',
                currentStep === 1 && 'bg-[#0A3690]'
              )}
            >
              <img
                src="/assets/images/hes/asset-select.png"
                loading="lazy"
                width="25px"
                height="25px"
              />
            </div>
            <div className="flex flex-col justify-self-end text-left">
              <p
                className={cn(
                  'font-bold',
                  currentStep === 1 && 'text-[#0A3690]'
                )}
              >
                Add{' '}
                {selectedFilter !== null
                  ? `${
                      selectedFilter === 'pss' || selectedFilter === 'dtr'
                        ? selectedFilter.toUpperCase()
                        : selectedFilter
                    } and`
                  : 'a'}{' '}
                meter
              </p>
              <p className="font-medium text-[#A3B2CF] font-sm">Select Asset</p>
            </div>
          </Button>

          <Button
            variant="ghost"
            className="flex gap-x-2"
            type="button"
            disabled={currentStep === 1}
          >
            <div
              className={cn(
                'w-[40px] h-[40px] flex items-center justify-center bg-[#A3B2CF] rounded-sm',
                currentStep === 2 && 'bg-[#0A3690]'
              )}
            >
              <img
                src="/assets/images/other/user.png"
                loading="lazy"
                width="25px"
                height="25px"
              />
            </div>
            <div className="flex flex-col justify-self-end text-left">
              <p
                className={cn(
                  'font-bold',
                  currentStep === 2 && 'text-[#0A3690]'
                )}
              >
                Add Protocol and Command
              </p>
              <p className="font-medium text-[#A3B2CF] font-sm">
                Execute Command
              </p>
            </div>
          </Button>
        </div>

        {selectedFilter === null && (
          <BaseModal
            open={openCsvModal}
            setOpen={setOpenCsvModal}
            ButtonLogo={UploadCsvButton}
            dialogTitle={'Upload Meter Csv'}
          >
            <UploadCSVfile
              setOpenCsvModal={setOpenCsvModal}
              setSelectedFilter={setSelectedFilter}
              setCurrentStep={setCurrentStep}
            />
          </BaseModal>
        )}
      </div>

      {currentStep === 1 && (
        <div className="flex flex-col md:flex-row flex-wrap gap-6">
          {selectedFilter === 'pss' && (
            <AsyncMultiOptionSelect
              loadOptions={pssOptions}
              handleChange={handleChangePss}
              value={primaryFilters.pss_id}
              loading={primaryFilterLoading}
              customCss="flex-none md:min-w-[220px] max-w-[70vw]"
              placeholder={'Sub-Station'}
              cacheOptions={false}
            />
          )}
          {selectedFilter === 'feeder' && (
            <AsyncMultiOptionSelect
              loadOptions={feederOptions}
              handleChange={handleChangeFeeder}
              value={primaryFilters.feeder_id}
              loading={primaryFilterLoading}
              customCss="flex-none md:min-w-[220px] max-w-[70vw]"
              placeholder={'Feeder'}
              cacheOptions={false}
            />
          )}
          {selectedFilter === 'dtr' && (
            <AsyncMultiOptionSelect
              loadOptions={dtrOptions}
              handleChange={handleChangeDtr}
              value={primaryFilters.dtr_id}
              loading={primaryFilterLoading}
              customCss="flex-none md:min-w-[220px] max-w-[70vw]"
              placeholder={'DTR'}
              cacheOptions={false}
            />
          )}

          <DeviceIdentifier
            primaryFilters={primaryFilters}
            deviceIdentifier={primaryFilters.device_identifier}
            cacheOptions={false}
            disabled={meterSearchDisabled}
            onChange={handleChangeDeviceIdentifier}
          />

          <Button
            type="button"
            variant="ghost"
            className="flex-1 md:flex-none px-5 hover:bg-[none] hover:text-[none] primary-vee-btn select-none"
            disabled={primaryFilters.device_identifier.length === 0}
            onClick={handleAddClick}
          >
            {assetsSelected.device_identifier.length > 0 ? 'Update' : 'Add'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AssetSelection;
