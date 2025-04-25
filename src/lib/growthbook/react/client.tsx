'use client';

import { useEffect, useMemo, type PropsWithChildren } from 'react';
import { GrowthBook, type Attributes as GrowthBookAttributes, type GrowthBookPayload } from '@growthbook/growthbook';
import { GrowthBookProvider, IfFeatureEnabled, useGrowthBook } from '@growthbook/growthbook-react';

import { env } from '@/../env.mjs';
import type { TFFeature } from '../features';

export function IfTFFeatureOn(props: { feature: TFFeature; children: React.ReactNode }) {
	return <IfFeatureEnabled feature={props.feature}>{props.children}</IfFeatureEnabled>;
}

export function IfTFFeatureOff(props: { feature: TFFeature; children: React.ReactNode }) {
	const gb = useGrowthBook();
	return gb?.isOff(props.feature) && <>{props.children}</>;
}

export function IfAnyTFFeatureOn(props: { outOf: TFFeature[]; children: React.ReactNode }) {
	const gb = useGrowthBook();
	const enabled = props.outOf.some((f) => gb?.evalFeature(f)?.on);
	return enabled && <>{props.children}</>;
}

export function IfAllTFFeaturesOff(props: { outOf: TFFeature[]; children: React.ReactNode }) {
	const gb = useGrowthBook();
	const enabled = props.outOf.every((f) => gb?.evalFeature(f)?.off);
	return enabled && <>{props.children}</>;
}

type GrowthBookClientProviderProps = PropsWithChildren<{
	payload: GrowthBookPayload;
	attributes: GrowthBookAttributes;
	enableDevMode?: boolean;
}>;

export function GrowthBookClientProvider({
	children,
	payload,
	attributes,
	enableDevMode = false,
}: GrowthBookClientProviderProps) {
	const gb = useMemo(
		() =>
			new GrowthBook({
				apiHost: env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
				clientKey: env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
				features: payload.features,
				attributes,
				enableDevMode,
				subscribeToChanges: true,
			}),
		[attributes, payload, enableDevMode]
	);

	useEffect(() => {
		gb.initSync({ payload, streaming: true });
		return () => gb.destroy();
	}, [gb, payload]);

	return <GrowthBookProvider growthbook={gb}>{children}</GrowthBookProvider>;
}
