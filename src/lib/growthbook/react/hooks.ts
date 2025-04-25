import { useFeature, useFeatureIsOn } from '@growthbook/growthbook-react';

import type { TFFeature, TFFeatures } from '../features';

type UseTFFeatureIsOn = typeof useFeatureIsOn<TFFeatures>;
export const useTFFeatureIsOn: UseTFFeatureIsOn = useFeatureIsOn;

export const useTFFeature = <Feature extends TFFeature>(feature: Feature) => useFeature<TFFeatures[Feature]>(feature);
