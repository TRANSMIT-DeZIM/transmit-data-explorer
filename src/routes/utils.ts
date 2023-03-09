import { interpolateHsl, quantize } from "d3-interpolate";

export type ChangeEventHandler<T> = Event & { currentTarget: EventTarget & T };

export type BarChartDataset = {
	xAxis: { type: string; data: string[] };
	series: {
		type: string;
		id: string;
		name: string;
		data: { value: number; itemStyle?: { color: string } }[];
	}[];
	seriesPct: BarChartDataset["series"];
	legend: {
		name: string;
		itemStyle?: { color: string };
	}[];
};

export function seriesValues(series: BarChartDataset["series"]): number[] {
	return series.flatMap((series) => series.data.map((item) => item.value));
}

export function seriesToPercentages(series: BarChartDataset["series"]): BarChartDataset["series"] {
	return series.map((series) => {
		const sum = series.data.reduce((acc, curr) => acc + curr.value, 0);
		return {
			...series,
			data: series.data.map((item) => ({
				...item,
				value: (item.value / sum) * 100,
			})),
		};
	});
}

export function interpolateColours(col1: string, col2: string, n: number): string[] {
	return quantize(interpolateHsl(col1, col2), n);
}

// Adapted from https://svelte.dev/repl/7729845536404efcaf1f6c65328df3f2
export function accordion(
	node: HTMLElement,
	{ isOpen, collapsedHeight }: { isOpen: boolean; collapsedHeight: string }
) {
	const initialHeight = node.offsetHeight;
	node.style.height = isOpen ? "auto" : collapsedHeight;
	node.style.overflow = "hidden";
	return {
		update({ isOpen, collapsedHeight }: { isOpen: boolean; collapsedHeight: string }) {
			const animation = node.animate(
				[
					{
						height: initialHeight + "px",
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
