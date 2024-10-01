// Install Pinia if not already installed
// npm install pinia

import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
    state: () => ({
        items: [],
        items_loading: false
    }),
    getters: {
        uniqueFieldValues: (state) => (field) => {
            const out = [];
            state.items.forEach(I => {
                if (I[field] === null || !I[field].length) return;
                if (typeof I[field] === 'string') {
                    if (!out.includes(I[field])) out.push(I[field]);
                } else {
                    I[field].forEach(v => {
                        if (v !== '' && !out.includes(v)) out.push(v);
                    });
                }
            });
            return out;
        }
    },
    actions: {
        addItem(value) {
            this.items.push(value);
        },
        removeItems() {
            this.items = [];
        },
        setItemsLoading(value) {
            this.items_loading = value;
        },
        async findItems() {
            if (this.items_loading) return;
            this.setItemsLoading(true);
            try {
                const response = await fetch('/.netlify/functions/read-sheets');
                const json = await response.json();
                console.log(json);
                this.removeItems();
                json.forEach(item => this.addItem(fixItemFields(item)));
                console.log({ Entries: this.items });
            } catch (e) {
                console.error(e);
                /* debug & local dev
                this.items = [{
                "Title": "ERROR: 10 week starter",
                "Topic": "ERR: Introduction to Open Science/Starter to ReproducibiliTea",
                "Contributors": "!William XQ Ngiam, !Jan Vornhagen",
                "undefined": null,
                "Content": [
                    {
                        "Order": 1,
                        "Block": "The 'issues' that lead to the reproducibility crisis",
                        "Paper": "Ioannidis JPA (2005). Why most published research findings are false. PLoS Med 2(8): e124. <a href=\"https://doi.org/10.1371/journal.pmed.0020124\" target=\"_blank\">https://doi.org/10.1371/journal.pmed.0020124</a>",
                        "Summary": "Defining the issue. By simulating at various levels of statistical power, across different pre-study odds, the accumulation of significant results is shown to be potentially false positives predominantly. The paper introduces concepts like the positive predictive value and how it is related to the p-value, and how important having high statistical power is for the rigor of research.",
                        "Keywords": [
                            "p-values",
                            "positive predictive values",
                            "false positives",
                            "statistical power"
                        ],
                        "Resource_description": "Summary video (by William Ngiam)",
                        "Resource_url": "https://www.youtube.com/watch?v=C7N_-XanpTI"
                    },
                    {
                        "Order": 2,
                        "Block": "The 'issues' that lead to the reproducibility crisis",
                        "Paper": "Smaldino, P. E., & McElreath, R. (2016). The natural selection of bad science. Royal Society open science, 3(9), 160384. <a href=\"https://doi.org/10.1098/rsos.160384\" target=\"_blank\">https://doi.org/10.1098/rsos.160384</a>",
                        "Summary": "The myth of self-correction. Estimates of statistical power historically in science appears to be extremely low. In addition to that, due to publication bias (the view that positive results are more likely to be published) and the incentives to publish, simulations suggest that a high false-discovery rate is 'naturally selected' for and that replications are ineffective at correcting that rate. ",
                        "Keywords": [
                            "statistical power",
                            "replication"
                        ],
                        "Resource_description": "Summary video (by William Ngiam)",
                        "Resource_url": "https://www.youtube.com/watch?v=EdLDE2Y4exM"
                    },
                    {
                        "Order": 3,
                        "Block": "The 'issues' that lead to the reproducibility crisis",
                        "Paper": "Simmons, J. P., Nelson, L. D., & Simonsohn, U. (2011). False-Positive Psychology: Undisclosed Flexibility in Data Collection and Analysis Allows Presenting Anything as Significant. Psychological Science, 22(11), 1359–1366. <a href=\"https://doi.org/10.1177/0956797611417632\" target=\"_blank\">https://doi.org/10.1177/0956797611417632</a>",
                        "Summary": "The problem of analytic flexibility. A demonstration of how decisions made by researchers in statistical analysis, such as dropping conditions or adding observations after a non-significant test, can easily produce a false positive result. ",
                        "Keywords": [
                            "analytic flexibility",
                            "researcher degrees of freedom",
                            "questionable research practices"
                        ],
                        "Resource_description": "Summary video (by William Ngiam)",
                        "Resource_url": "https://www.youtube.com/watch?v=bf3GqyBRgzY"
                    },
                    {
                        "Order": 4,
                        "Block": "The extent of the 'issues'",
                        "Paper": "John, L. K., Loewenstein, G., & Prelec, D. (2012). Measuring the Prevalence of Questionable Research Practices With Incentives for Truth Telling. Psychological Science, 23(5), 524–532. <a href=\"https://doi.org/10.1177/0956797611430953\" target=\"_blank\">https://doi.org/10.1177/0956797611430953</a>",
                        "Summary": "The prevalence of questionable research practices. With an incentive for honest reporting, psychologists were surveyed about engaging in questionable research practices and the proportion doing so may be surprisingly high. ",
                        "Keywords": [
                            "questionable research practices"
                        ]
                    },
                    {
                        "Order": 5,
                        "Block": "The extent of the 'issues'",
                        "Paper": "Open Science Collaboration. (2015). Estimating the reproducibility of psychological science. Science, 349(6251). \n<a href=\"https://doi.org/10.1126/science.aac4716\" target=\"_blank\">https://doi.org/10.1126/science.aac4716</a>",
                        "Summary": "The Reproducibility Project: Psychology. A large-scale, collaborative replication effort of 100 published psychological findings showed the majority of findings did not reproduce, and those that do replicate mostly produced a smaller effect-size. This project provided an initial estimate of the reproducibility in science and brought attention for the need of methodological reform.",
                        "Keywords": [
                            "reproducibility",
                            "replication"
                        ],
                        "Resource_description": "Brian Nosek in an interview about the results and implications of the Reproducibility Project: Psychology",
                        "Resource_url": "https://www.youtube.com/watch?v=iD1MWkDghLM"
                    },
                    {
                        "Order": 6,
                        "Block": "Perspectives on the reproducibility crisis",
                        "Paper": "Vazire, S. (2018). Implications of the credibility revolution for productivity, creativity, and progress. Perspectives on Psychological Science, 13(4), 411-417. <a href=\"https://doi.org/10.1177%2F1745691617751884\" target=\"_blank\">https://doi.org/10.1177%2F1745691617751884</a>",
                        "Summary": "The credibility revolution. A reframing of the 'reproducibility crisis' that highlights the scientific reforms that have occurred with the Open Science movement, and their potential impacts on the productivity, creativity and progress of scientists.",
                        "Keywords": [
                            "credibility revolution",
                            "commentary",
                            "summary"
                        ],
                        "Resource_description": "Presentation by Simine Vazire at OSC 2019",
                        "Resource_url": "https://www.youtube.com/watch?v=Yf1Ovx-OixE"
                    },
                    {
                        "Order": 7,
                        "Block": "Perspectives on the reproducibility crisis",
                        "Paper": "Yarkoni, T. (2018). No, its not The Incentives - it’s you. Yarkoni Blog - [citation needed]: <a href=\"https://www.talyarkoni.org/blog/2018/10/02/no-its-not-the-incentives-its-you/\" target=\"_blank\">https://www.talyarkoni.org/blog/2018/10/02/no-its-not-the-incentives-its-you/</a>",
                        "Summary": "Dealing with the Incentives. A blogpost arguing that the responsibility for reproducible science rests with the individual, and that the Incentives are not a good reason to be absolved of that responsibility",
                        "Keywords": [
                            "incentives",
                            "commentary"
                        ]
                    },
                    {
                        "Order": 8,
                        "Block": "Getting started with Open Science",
                        "Paper": "Kathawalla, U. K., Silverstein, P., & Syed, M. (2021). Easing into open science: A guide for graduate students and their advisors. Collabra: Psychology, 7(1). <a href=\"https://doi.org/10.1525/collabra.18684\" target=\"_blank\">https://doi.org/10.1525/collabra.18684</a>",
                        "Summary": "Easing into Open Science. A very accessible guide for graduate students (and their advisors) on some of the different ways to engage with the reproducibility movement. They are given difficulty ratings (easy, medium or difficult) and potential worries are also addressed. ",
                        "Keywords": [
                            "early-career researchers",
                            "introductory",
                            "pre-registration"
                        ],
                        "Resource_description": "Presentation by Priya Silverstein at RIOT Science Club",
                        "Resource_url": "https://www.youtube.com/watch?v=owJaD3UiseQ"
                    },
                    {
                        "Order": 9,
                        "Block": "Getting started with Open Science",
                        "Paper": "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie Du Sert, N., Simonsohn, U., Wagenmakers, E. J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 1–9. <a href=\"https://doi.org/10.1038/s41562-016-0021\" target=\"_blank\">https://doi.org/10.1038/s41562-016-0021</a>",
                        "Summary": "A manifesto for reproducible science. A general overview of the goals of various reproducibility measures and how they can be implemented.",
                        "Keywords": [
                            "guide",
                            "reproducibility"
                        ]
                    },
                    {
                        "Order": 10,
                        "Block": "Getting started with Open Science",
                        "Paper": "Crüwell, S., van Doorn, J., Etz, A., Makel, M. C., Moshontz, H., Niebaum, J. C., ... & Schulte-Mecklenbeck, M. (2019). Seven easy steps to open science. Zeitschrift für Psychologie. <a href=\"http://dx.doi.org/10.1027/2151-2604/a000387\" target=\"_blank\">http://dx.doi.org/10.1027/2151-2604/a000387</a>",
                        "Summary": "Where to next? An annotated reading list of papers from seven topics: open access, open data, preregistration, reproducible analyses, replications and teaching open science in an attempt to make those practices more understandable and actionable for readers",
                        "Keywords": [
                            "transparency",
                            "meta-science"
                        ]
                    }
                ]
            },]
                 */
            }
            this.setItemsLoading(false);
        }
    }
});

function fixItemFields(item) {
    item.Content = item.Content.filter(x => !!x.Paper && !/^paper$/i.test(x.Paper));  // also remove header row
    item.Content = item.Content.map(x => fixFields(x));
    return item;
}

function fixFields(item) {
    const k = 'Keywords';
    if (Object.prototype.hasOwnProperty.call(item, k)) {
        item[k] = item[k].split(/, */).filter(x => x !== '');
    }
    item.Order = parseInt(item.Order);
    item.Paper = item.Paper.replace(
        /(https?:\/\/[^ ]+)/g,
        '<a href="$1" target="_blank">$1</a>'
    );
    return item;
}