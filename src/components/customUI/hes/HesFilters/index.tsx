import { useCallback, useEffect } from 'react';
import SubmitButton from '@/components/customUI/Button/SubmitButton';
import { hesFiltersStateToObject } from '@/lib/hes';
import useHesPrimaryFilterState from '@/hooks/hes/useHesPrimaryFilterState';
import { useLocation, useSearchParams } from 'react-router-dom';
import PrimaryFilters from './PrimaryFilters';
import Button from '@/components/ui/button';
import { setMainFilterLoading } from '@/store/hes';
import { useAppDispatch } from '@/store';


const HesFilters = () => {

  const dispatch = useAppDispatch()

  const { search } = useLocation()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();

  const { primaryFilters, setPrimaryFilters } = useHesPrimaryFilterState();

  const resetPrimaryFilters = useCallback(() => {
    if(search.length === 0) return
    setSearchParams({})
  }, [ search, setSearchParams ])

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newParams = hesFiltersStateToObject(primaryFilters);
      dispatch(setMainFilterLoading(true))
      setSearchParams(newParams, { replace: true });
    },
    [primaryFilters, setSearchParams, dispatch]
  );

  useEffect(() => {
    dispatch(setMainFilterLoading(false))
  }, [ search ])

  return (
    <form
      className=" mt-5 rounded-lg bg-transparent flex-1 flex flex-wrap gap-x-5 gap-y-5"
      onSubmit={handleSubmit}
    >
      <PrimaryFilters
        primaryFilters={primaryFilters}
        setPrimaryFilters={setPrimaryFilters}
      />

      <SubmitButton title="Search" />
      <Button
        type="button"
        className="destroy-filter-color"
        variant={'secondary'}
        onClick={resetPrimaryFilters}
      >
        Clear
      </Button>
    </form>
  );
};

export default HesFilters;
