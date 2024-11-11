export interface GoogleReview {
	name: string;
	rating: number;
	content: string;
	picture?: string;
}

export const googleReviews: GoogleReview[] = [
	{
		name: 'Christian Lechner-Ernst',
		rating: 5,
		content:
			'Danke an Halil und sein Team, sie waren bei jedem Problem sofort zur Stelle und haben eine einfache und gute Lösung gefunden! Saubere Arbeit, angenehmer Austausch und seine Kollegen freundlich und fleißig! Wie gesagt, DANKE und gerne wieder, wenn ich euch brauche…'
	},
	{
		name: 'Günther Spielmann',
		rating: 5,
		content:
			'Machten bei mir die komplette Haus- und Dachverblechung zu vollster Zufriedenheit. Pünktlich, termingerecht, immer höflich und arbeiteten sauber und schnell'
	},
	{
		name: 'Ahmet Ozturk',
		rating: 5,
		content: 'Beste Spenglerei in Tirol verlässlich und sauber👍👍👍'
	},
	{
		name: 'Carina Kofler',
		rating: 5,
		content:
			'Sehr gute und kompetente Beratung, saubere, professionelle, rasche und zeitnahe Umsetzung mit qualitativ hochwertigen Materialien. Wir würden auch sechs Sterne vergeben, wenn wir könnten, denn wir sind mit den Leistungen 100%-ig zufrieden und können diesen Betrieb nur weiterempfehlen.'
	},
	{
		name: 'Stefan Pichler',
		rating: 5,
		content:
			'Ich möchte mich für die ausgezeichnete Arbeit bedanken. Bei mir wurde ein Garagendach und eine Oberlichte saniert und dabei Baumängel behoben. Die Zusammenarbeit war tiptop. Ein Handwerkbetrieb, der auf seine Arbeit vertraut, geführt von einem Ehrenmann. Empfehlung!'
	},
	{
		name: 'Thomas Norz',
		rating: 5,
		content:
			'Fachlich sehr kompetente Spenglerei. Mich hat das Fachwissen und die darauf folgende Ausführung positiv überzeugt. Preislich minimal höher, jedoch gerechtfertigt, da die technische Ausführung dem Stand der Technik entspricht. Kann die Firma nur empfehlen.'
	},
	{
		name: 'Florian Isser',
		rating: 5,
		content: 'Super schnell. Kompetent und extrem verlässlich. Nur zu empfehlen!'
	},
	{
		name: 'Gelbe Blume',
		rating: 5,
		content:
			'Schnelle, saubere und Professionelle Arbeit. Obwohl die Auftragsnummer voll waren, wurde für mich eine kleine Arbeit übernommen. Danke'
	},
	{
		name: 'Siyabend Austria',
		rating: 5,
		content: 'Hat bei uns das Dach gemacht. Top Arbeit. Top Firma.'
	},
	{
		name: 'Burkhard Lechner',
		rating: 5,
		content: 'Kleine aber feine Senglerei'
	},
	{
		name: 'Elli Melli Joulias',
		rating: 5,
		content: 'Sehr saubere und genaue Arbeit, bin mehr als zufrieden.'
	},
	{
		name: 'Muhammed Öztürk',
		rating: 5,
		content:
			'Professionelle Arbeit bei meinem Neubau. Pünktlich fertig geworden, sauber und vor allem aber Preis/Leistung konkurrenzlos in Tirol.'
	},
	{
		name: 'Musa Kuldur',
		rating: 5,
		content: 'Sehr professionell. Pünktlich, sauber, Preis Leistung Top 👍',
		picture:
			'https://lh3.googleusercontent.com/a-/ALV-UjXGIlUqR9NRG9haojo8QchiMVYnYvbrRooYp7j94jW-CAtAu_Tzhg=s64-c-rp-mo-br100'
	},
	{
		name: 'Taner Cengiz',
		rating: 5,
		content:
			'Ausgezeichnete Leistung, sehr kooperative Haltung, saubere Arbeit, Preis & Leistungsverhältniss ist top. Man bekommt das, wofür man bezahlt hat aber auch nicht mehr 😊'
	},
	{
		name: 'Ustu Ustu',
		rating: 5,
		content:
			'Volle Empfehlung! Sehr gute Firma, perfekte Arbeit, kompetente Beratung, Termin eingehalten, Preis in Ordnung. Es gibt absolut nichts auszusetzen. Gerne wieder!'
	}
];

export { googleReviews as default };
