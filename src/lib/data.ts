import dataMena0 from "$lib/data-mena.json";
import dataWestAfrica0 from "$lib/data-west-africa.json";

export const dataMena: Record<string, any> = dataMena0;
export const dataWestAfrica: Record<string, any> = dataWestAfrica0;

export const varLabels: Record<string, { label: string; labelShort?: string; question?: string }> =
	{
		Rcountry: {
			label: "Country of residence",
			labelShort: "Residence",
		},
		strata: {
			label: "Strata",
			labelShort: "Strata",
		},
		agegr: {
			label: "Age group",
			labelShort: "Age",
			question: "How old are you?",
		},
		gender: {
			label: "Gender",
			question:
				'What is your gender? ("Male", "Female" or "Other". "Other" category removed due to small cell sizes to protect respondents\' anonymity.)',
		},
		edu: {
			label: "Educational attainment",
			labelShort: "Education",
			question:
				"Combined and regrouped responses from three questions:<br>1. What is the highest school-leaving certificate you currently hold from a general-education school, if any?<br>2. Have you attended college or university?<br>3. What is the highest certificate you received?",
		},
		employment: {
			label: "Employment status",
			question:
				"Are you currently employed in the private sector, employed in the public sector (e.g. army, public education, ministries), self-employed, or a daily wage worker?",
		},
		health: {
			label: "Self-rated health",
			question: "How would you describe your current health?",
		},
		hhecon: {
			label: "Economic condition",
			question:
				"Over the past 4 weeks: Which of the following statements best describes the current economic situation of your household?<br>1. money is not enough for food<br>2. money is enough for food, but not for other basics (e.g. electricity, airtime, current education)<br>3. money is enough for basics, but not enough for unexpected expenses on health and home maintenance (e.g. medication, small purchases)<br>4. money is enough for basics and health/maintenance, but not for expensive durables (e.g. a new refrigerator, restorations)<br>5. we can afford to buy some expensive durables<br>6. we can afford to buy almost anything that we deem appropriate",
		},
		discr_nat: {
			label: "Experiences of discrimination",
			question:
				"For each of the following types of discrimination, please tell me how common they occur in [country] in your opinion; Discrimination based on nationality/citizenship in [country]",
		},
		plan_mig: {
			label: "Intent to migrate",
			question:
				'How much, if at all, are you considering to move to another country to live (for more than 3 months)? Please rate on a scale from 0 ("I don\'t want to move at all") to 10 ("I really want to move").',
		},
		mig_desire_cntry: {
			label: "Ideal destination",
			question:
				"Ideally, if you had the opportunity, would you like to move permanently to another country, or would you prefer to continue living in this country? Where would you want to permanently live? (Regrouped individual country response by region)",
		},
		emiglike: {
			label: "Intent to migrate",
			question:
				"How much, if at all, are you considering to move to another country to live (for more than 3 months)?",
		},
		emiglike_region: {
			label: "Ideal destination",
			question:
				"If you were to move without any restrictions, what country would you like to live in the most? (Regrouped individual country response by region)",
		},
	};
