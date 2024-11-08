<script>
	export let which;
</script>

<input type="checkbox" id="about-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box relative w-5/6 max-w-5xl text-left">
		<label for="about-modal" class="btn btn-circle btn-sm absolute right-2 top-2">✕</label>
		<h2 class="py-4 text-xl font-bold">
			<span> Perspectives on Migration and Integration (TRANSMIT) </span>
			<span class:hidden={which !== "MENA"}> &mdash; MENA</span>
			<span class:hidden={which !== "West Africa"}> &mdash; West-Africa</span>
		</h2>

		<div class="py-4" class:hidden={which !== "TRANSMIT"}>
			<a
				class="link"
				target="_blank"
				rel="noreferrer"
				href="https://www.dezim-institut.de/projekte/projekt-detail/transnational-perspectives-on-migration-and-integration-transmit-7-13/"
				>Transnational Perspectives on Migration and Integration (TRANSMIT)</a
			>
			collects data in Lebanon, Türkiye, Morocco, Italy, Nigeria, Senegal, the Gambia, and Germany. TRANSMIT
			is a migration research project of the
			<a
				class="link"
				target="_blank"
				rel="noreferrer"
				href="https://www.dezim-institut.de/dezim-forschungsgemeinschaft/ueber-die-forschungsgemeinschaft/"
				>DeZIM-Forschungsgemeinschaft (DeZIM FG)</a
			>
			and funded by the German Federal Ministry for Family Affairs, Senior Citizens, Women and Youth
			(BMFSFJ). The project is carried out in cooperation with the
			<a class="link" target="_blank" rel="noreferrer" href="https://www.bim.hu-berlin.de/"
				>Berliner Institut für empirische Integrations- und Migrationsforschung (BIM)</a
			>, the
			<a class="link" target="_blank" rel="noreferrer" href="https://iab.de/"
				>Institute for Employment Research (IAB)</a
			>, the
			<a
				class="link"
				target="_blank"
				rel="noreferrer"
				href="https://www.imis.uni-osnabrueck.de/dezim/transmit_transnational_perspectives_on_migration_and_integration.html"
				>Institute for Migration Research and Intercultural Studies (IMIS)</a
			>, the
			<a class="link" target="_blank" rel="noreferrer" href="https://www.mzes.uni-mannheim.de/d7/en"
				>Mannheim Center for European Social Research (MZES)</a
			>
			and the
			<a
				class="link"
				target="_blank"
				rel="noreferrer"
				href="https://www.wzb.eu/de/forschung/migration-und-diversitaet/migration-integration-transnationalisierung/projekte/transmit-transnational-perspectives-on-migrant-integration"
				>Berlin Social Science Center (WZB)</a
			>. The project studies the complex interplay between migration dynamics, migrants' well-being
			and integration processes by building a transnational data infrastructure that collects and
			links quantitative and qualitative data and knowledge on countries of origin, transit and
			destination.
		</div>

		<div class="py-4" class:hidden={which !== "MENA"}>
			<p>
				The data presented in the MENA TRANSMIT Data Explorer was drawn from the first (Türkiye) and
				second (Lebanon) wave of an ongoing longitudinal survey of Syrians living in Lebanon and
				Türkiye collected in face-to-face interviews between September 2020 and February 2021 as
				part of the TRANSMIT research project. The study aims at providing a nationally
				representative sample of the respective Syrian populations in the two countries, as well as
				a sample of the host population living in the same neighborhoods and covers a broad set of
				questions on respondent's family structure, demographic and psychological characteristics,
				migration experiences, economic, social and physical well-being. Sampling was conducted via
				multilevel area sampling and random walks.
			</p>
			<h3 class="pb-2 pt-4 text-lg font-bold">Baseline Sampling</h3>
			<p>
				The baseline survey in Lebanon took place in 2019 and in Türkiye in 2020. In each case, the
				study population included all individuals with a minimum age of 15 years who were in Lebanon
				and Türkiye, respectively, at the time of this initial survey and who were living in
				non-segregated institutions (e.g., prison, barracks). The survey was stratified by country
				of birth of the head of household, such that 50% of respondents were from Syrian households
				and 50% were from non-Syrian households. Because detail registry data for the Syrian
				population in either country is not available, the selection of respondents took place
				through multilevel area sampling combined with the random walk method. For this,
				interviewers walked the streets in the selected neighborhood according to predetermined
				rules to select households for participation. Within the households that agree to
				participate, the choice of the interviewee(s) is also random (within age requirements).
			</p>
			<h3 class="pb-2 pt-4 text-lg font-bold">Follow-up</h3>
			<p>
				Follow-up surveys were conducted in Lebanon in 2020/21 (LE wave 2), 2021/22 (LE wave 3) and
				2022 (LE wave 4), and in Türkiye in 2020/21 (TC wave 2) and 2022 (TC wave 3). In each case,
				respondents from the previous survey wave(s) were first contacted and asked to participate
				in the survey again. The re-contacting of the participants took place on the basis of the
				addresses at which the previous interview had taken place. If the respondents could not be
				found, two additional visits were made a few days apart. If it was still not possible to
				contact the persons, they were contacted by telephone, if their telephone numbers were
				available, and an interview appointment was arranged. If the persons could not be reached or
				refused to participate in the study again, the contact attempts were discontinued and the
				contact data of the respondents were permanently deleted.
			</p>
			<p>
				Due to the dropout of participants for the follow-up surveys, additional participants were
				selected as a refresher sample according to the sampling process described above. If the
				target number of participants, or the quota of Syrian and non-Syrian households, could not
				be met through interviews within the neighborhoods of participants in the previous surveys,
				additional neighborhoods were selecte. The selection of these additional neighborhoods is
				equivalent to the area sampling strategy of the previous survey.
			</p>
			<h3 class="pb-2 pt-4 text-lg font-bold">Interview Process</h3>
			<p>
				The survey was conducted through Computer Assisted Personal Interviews (CAPI), based on
				questionnaires designed by the project team for the survey context of Lebanon. In the case
				of Lebanon, the interviews were conducted in Arabic by native speakers. In Türkiye, the
				interviews were conducted in Arabic or Turkish according to the preference of the
				participants. In both cases, a native speaker conducted the interviews. After explaining the
				purpose and content of the study and obtaining the consent of the participants, the
				interview was conducted in an ideally secluded place in the premises of the interviewee,
				which was determined by the interviewee him-/herself. Interviews lasted on average between
				45-60 min. Participants were free to pause the interview at any time, skip individual
				questions, or stop the interview.
			</p>
			<h3 class="pb-2 pt-4 text-lg font-bold">Data Processing</h3>
			<p>
				The data provided in the Data Explorer have been cleaned of outlier observations based on
				standardized criteria and are fully processed. Prospectively, follow-up Waves of the survey
				will be added to the Data Explorer as they become available.
			</p>
		</div>

		<div class="py-4" class:hidden={which !== "West Africa"}>
			<p>
				The data presented in the West Africa TRANSMIT Data Explorer is drawn from the two waves of
				longitudinal surveys conducted in Senegal, the Gambia and Nigeria, respectively. The surveys
				were conducted as face-to-face interviews as part of the TRANSMIT research project, between
				2019 and 2023. The surveys aim at providing regionally (Senegal and Nigeria) and nationally
				(the Gambia) representative samples of the respective populations in these countries,
				covering a broad set of questions on respondent's family structure, demographic
				characteristics, migration experiences and aspirations as well as on economic and social
				well-being. Sampling was conducted via random stratified sampling and random walks.
			</p>
			<h3 class="pb-2 pt-4 text-lg font-bold">Baseline Sampling</h3>
			<p>
				The baseline surveys in Senegal and the Gambia took place in 2019, while the first wave in
				Nigeria was conducted in 2021. In case of Senegal and the Gambia, the study population
				includes individuals between the ages of 15 and 35, the age during which people are most
				likely to migrate. In Nigeria, the sample population includes individuals aged 15 and older.
			</p>
			<p>
				In the Gambia, the survey took place between March and April 2019. A nationwide random
				stratified sampling (14 substrata subdivided into 4098 districts out of which 164 districts
				were randomly drawn) weighted by the relative population shares of 10- to 30-year-olds in
				the 2013 census was implemented.
			</p>
			<p>
				The survey conducted in Senegal was implemented in Dakar and Casamance regions between
				October and December 2019. In Casamance, three regions were covered (Ziguinchor, Kolda,
				Sédhiou), stratified by rural / urban area and weighted by relative population shares.
			</p>
			<p>
				The baseline survey in Nigeria took place in April and May 2021, in the federal states of
				Edo and Kaduna. A two-stage random sampling procedure was implemented, first selecting 125
				5x5km clusters, followed by the selection of the corresponding number of smaller 500x500
				meter clusters within each bigger cluster, using probabilities proportional to the
				population size.
			</p>
			<p>
				In all three countries, random stratified sampling was combined with a random walk method,
				where interviewers walked the streets in the selected neighbourhood according to
				predetermined rules to select households for participation. Within the households that agree
				to participate, the choice of the interviewee(s) is also random (within age requirements).
			</p>
			<h3 class="pb-2 pt-4 text-lg font-bold">Second Wave</h3>
			<p>
				Second waves of all surveys were conducted in Senegal and the Gambia (Senegal wave 2, the
				Gambia wave 2) in 2021, and in Nigeria (Nigeria wave 2) in 2023. Conducting the survey in
				the same geographical locations as chosen by the respective procedure in the first waves,
				new survey respondents were recruited using a random walk procedure starting at the location
				of respondents from the initial survey wave.
			</p>
			<h3 class="pb-2 pt-4 text-lg font-bold">Interview Process</h3>
			<p>
				The surveys were conducted through Computer Assisted Personal Interviews (CAPI), based on
				questionnaires designed by the project team. In the case of Senegal and the Gambia, the
				interviews were conducted in French or, if the respondent did not speak French, in a local
				language. In Nigeria, the interviews were conducted in either English or Nigerian Pidgin,
				according to the preference of the participants. In both cases, a native speaker conducted
				the interviews. After explaining the purpose and content of the study and obtaining the
				consent of the participants, the interview was conducted in an ideally secluded place in the
				premises of the interviewee, which was determined by the interviewee him-/herself.
				Interviews lasted on average between 45-60 min. Participants were free to pause the
				interview at any time, skip individual questions, or stop the interview.
			</p>
			<h3 class="pb-2 pt-4 text-lg font-bold">Data Processing</h3>
			<p>
				The data provided in the Data Explorer have been cleaned of outlier observations based on
				standardized criteria and are fully processed.
			</p>
		</div>

		<hr />

		<div class="py-4">
			The web application was developed by <a
				class="link"
				target="_blank"
				rel="noreferrer"
				href="https://lo-ng.netlify.app/">Long Nguyen</a
			>
			(<a
				class="link"
				target="_blank"
				rel="noreferrer"
				href="https://github.com/TRANSMIT-DeZIM/transmit-data-explorer/">source code</a
			>). The content is licensed under a
			<a
				class="link"
				target="_blank"
				rel="noreferrer"
				href="https://creativecommons.org/licenses/by/4.0/"
				>Creative Commons Attribution 4.0 International license</a
			>.
		</div>
	</div>
</div>
