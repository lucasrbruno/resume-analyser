import React from "react";

export const resumes: Resume[] = [
  {
    id: "1",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "2",
    companyName: "Microsoft",
    jobTitle: "Cloud Engineer",
    imagePath: "/images/resume_02.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "3",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    imagePath: "/images/resume_03.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
];

export const AIResponseFormat = `
      interface Feedback {
      overallScore: number; //max 100
      ATS: {
        score: number; //nota baseado na adequação do currículo para sistemas ATS
        tips: {
          type: "good" | "improve";
          tip: string; //dar 3-4 dicas
        }[];
      };
      toneAndStyle: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //fazer disso um "título" curto para a explicação real
          explanation: string; //explicar em detalhes aqui
        }[]; //dar 3-4 dicas
      };
      content: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //fazer disso um "título" curto para a explicação real
          explanation: string; //explicar em detalhes aqui
        }[]; //dar 3-4 dicas
      };
      structure: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //fazer disso um "título" curto para a explicação real
          explanation: string; //explicar em detalhes aqui
        }[]; //dar 3-4 dicas
      };
      skills: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //fazer disso um "título" curto para a explicação real
          explanation: string; //explicar em detalhes aqui
        }[]; //dar 3-4 dicas
      };
    }`;

export const prepareInstructions = ({
  jobTitle,
  jobDescription,
}: {
  jobTitle: string;
  jobDescription: string;
}) =>
  /*`You are an expert in ATS (Applicant Tracking System) and resume analysis.
  Please analyze and rate this resume and suggest how to improve it.
  The rating can be low if the resume is bad.
  Be thorough and detailed. Don"t be afraid to point out any mistakes or areas for improvement.
  If there is a lot to improve, don"t hesitate to give low scores. This is to help the user to improve their resume.
  If available, use the job description for the job user is applying to to give more detailed feedback.
  If provided, take the job description into consideration.
  The job title is: ${jobTitle}
  The job description is: ${jobDescription}
  Provide the feedback using the following format: ${AIResponseFormat}
  Return the analysis as a JSON object, without any other text and without the backticks.
  Do not include any other text or comments.`*/
  `Você é um especialista em ATS (Applicant Tracking System) e análise de currículos.
  Por favor, analise e avalie este currículo e sugira como melhorá-lo.
  A avaliação pode ser baixa se o currículo for ruim.
  Seja minucioso e detalhado. Não tenha medo de apontar quaisquer erros ou áreas para melhoria.
  Se houver muito a melhorar, não hesite em dar notas baixas. Isso é para ajudar o usuário a melhorar seu currículo.
  Se disponível, use a descrição do trabalho para o qual o usuário está se candidatando para fornecer um feedback mais detalhado.
  Se fornecido, leve a descrição do trabalho em consideração.
  O título do trabalho é: ${jobTitle}
  A descrição do trabalho é: ${jobDescription}
  Forneça o feedback usando o seguinte formato: ${AIResponseFormat}
  Retorne a análise como um objeto JSON, sem nenhum outro texto e sem as aspas invertidas.
  Não inclua nenhum outro texto ou comentário.`;