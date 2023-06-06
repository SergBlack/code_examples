import { useCallback, useMemo } from 'react';

import { FilterTagsType } from '@/types';

export const useFilterTags = <T>(filterValues: T, onFilter: (value?: T) => void) => {
  const filterTagsValues = useMemo(
    () =>
      Object.entries(filterValues).reduce((acc, [key, value]) => {
        acc[key] = { title: key, value };

        return acc;
      }, {} as FilterTagsType),
    [filterValues]
  );

  const closeFilterTag = useCallback(
    (key: string, value: string | boolean) => {
      const filterItem = filterValues[key as keyof T];

      if (Array.isArray(filterItem)) {
        const newFilterItem = filterItem?.filter((itemValue) => itemValue !== value);

        onFilter({ ...filterValues, [key]: newFilterItem });
      } else {
        onFilter({ ...filterValues, [key]: undefined });
      }
    },
    [filterValues, onFilter]
  );

  const closeAllTag = useCallback(() => {
    onFilter();
  }, [onFilter]);

  return useMemo(
    () => ({ filterTagsValues, closeFilterTag, closeAllTag }),
    [filterTagsValues, closeFilterTag, closeAllTag]
  );
};
