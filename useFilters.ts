import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { Technology } from '@/types';

import { useLocalStorage } from './useLocalStorage';

export const useFilters = <T extends { technologies?: string[] }>(
  initialFilterValues: T,
  localStorageField: string,
  technologiesMap?: Map<string, Technology>
) => {
  const router = useRouter();
  const { getFromStorage, setToStorage } = useLocalStorage(localStorageField);
  const filterValuesFromStorage = getFromStorage();
  const { search: searchFromQuery } = router.query as Record<string, string | undefined>;

  const [search, setSearch] = useState<string>(searchFromQuery || '');
  const [filterValues, setFilterValues] = useState<T>({
    ...initialFilterValues,
    ...filterValuesFromStorage,
  });

  const preparedFilterValues: T = useMemo(() => {
    const preparedFilters = { ...filterValues };

    if (filterValues.technologies && technologiesMap) {
      preparedFilters.technologies = filterValues.technologies.filter((id) => Boolean(technologiesMap.get(id)));
    }

    return preparedFilters;
  }, [filterValues, technologiesMap]);

  const selectedFiltersCount = useMemo(() => {
    return Object.values(preparedFilterValues).reduce((acc, value) => {
      let result = acc;

      if (Array.isArray(value)) {
        result += value.length;

        return result;
      }

      if (value) {
        result += 1;

        return result;
      }

      return result;
    }, 0);
  }, [preparedFilterValues]);

  const onSearch = useCallback((value: string) => {
    setSearch(value.trim());
  }, []);

  const onFilter = useCallback(
    (filterValue = initialFilterValues) => {
      setToStorage(filterValue);
      setFilterValues(filterValue);
    },
    [initialFilterValues, setToStorage]
  );

  useEffect(() => {
    setToStorage(preparedFilterValues);
  }, [preparedFilterValues, setToStorage]);

  return useMemo(
    () => ({ filterValues: preparedFilterValues, selectedFiltersCount, search, onFilter, onSearch }),
    [onFilter, onSearch, preparedFilterValues, search, selectedFiltersCount]
  );
};
