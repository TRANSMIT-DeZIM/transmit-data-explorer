import { interpolateHsl, quantize } from "d3-interpolate";

export type ChangeEventHandler<T> = Event & { currentTarget: EventTarget & T };

export type EChartsOptsData = {
	xAxis: { type: string; data: string[] };
	series: {
		type: string;
		id: string;
		name: string;
		data: { value: number; itemStyle?: { color: string } }[];
	}[];
	legend: {
		data: {
			name: string;
			itemStyle?: { color: string };
		}[];
	};
};

export function firstNonNull<T>(obj: Record<string, T>, ...properties: string[]): T | undefined {
	return properties.reduce((value: T | undefined, property) => value || obj[property], undefined);
}

export function unzipObj<T>(arr: Record<string, T>[]): Record<string, T[]> {
	return arr.reduce((acc, curr) => {
		return Object.entries(curr).reduce((acc, [key, value]) => {
			return { ...acc, [key]: [...(acc[key] || []), value] };
		}, acc);
	}, {} as Record<string, T[]>);
}

export function interpolateColours(col1: string, col2: string, n: number): string[] {
	return quantize(interpolateHsl(col1, col2), n);
}

// Adapted from https://svelte.dev/repl/7729845536404efcaf1f6c65328df3f2
export function accordion(
	node: HTMLElement,
	{ isOpen, collapsedHeight }: { isOpen: boolean; collapsedHeight: string }
) {
	const initialHeight = node.offsetHeight + "px";
	node.style.height = isOpen ? initialHeight : collapsedHeight;
	node.style.overflow = "hidden";
	return {
		update({ isOpen, collapsedHeight }: { isOpen: boolean; collapsedHeight: string }) {
			const animation = node.animate(
				[
					{
						height: initialHeight,
						overflow: "hidden",
					},
					{
						height: collapsedHeight,
						overflow: "hidden",
					},
				],
				{ duration: 150, fill: "both" }
			);
			animation.pause();
			if (!isOpen) {
				animation.play();
			} else {
				animation.reverse();
			}
		},
	};
}
