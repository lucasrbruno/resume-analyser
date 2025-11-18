import { prepareInstructions } from "../../constants";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { convertPdfToImage } from "~/lib/pdf2img";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";

const Upload = () => {
    const {  fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file);
    };

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File }) => {
        setIsProcessing(true);
        setStatusText("Enviando currículo para análise...");

        const uploadedFile = await fs.upload([file]);

        if (!uploadedFile) return setStatusText("Erro ao enviar o arquivo.");

        setStatusText("Convertendo para imagem...");
        const imageFile = await convertPdfToImage(file)
        if (!imageFile.file) return setStatusText("Erro ao converter PDF para imagem.");

        setStatusText("Enviando imagem...");
        const uploadedImage = await fs.upload([imageFile.file]);

        if (!uploadedImage) return setStatusText("Erro ao enviar a imagem.");
        setStatusText("Preparando dados...");

        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName,
            jobTitle,
            jobDescription,
            feedback: "",
        };

        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText("Analisando currículo...");

        const feedback = await ai.feedback(
            uploadedFile.path, 
            prepareInstructions({jobTitle, jobDescription}));

        if (!feedback) return setStatusText("Erro ao analisar currículo.");

        const feedbackText = typeof feedback.message.content === "string"
            ? feedback.message.content
            : feedback.message.content[0];
        
        
        data.feedback = JSON.parse(feedbackText.text);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText("Análise concluída! Redirecionando...");
        navigate(`/resume/${uuid}`);  
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest("form");
        if (!form) return;
        const formData = new FormData(form);
        const companyName = formData.get("company-name");
        const jobTitle = formData.get("job-title");
        const jobDescription = formData.get("job-description");

        if (!file) return;

        handleAnalyze({ companyName: companyName as string, jobTitle: jobTitle as string, jobDescription: jobDescription as string, file });

    };

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />
            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Feedback inteligente para o seu trabalho dos sonhos</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" className="w-full" />
                        </>
                    ) : (
                        <h2>Deixe seu currículo para receber uma nota ATS e dicas para melhorá-lo</h2>
                    )}
                </div>
                {!isProcessing && (
                    <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                        <div className="form-div">
                            <label htmlFor="company-name">Nome da Empresa</label>
                            <input type="text" name="company-name" placeholder="Nome da Companhia" id="company-name" />
                        </div>

                        <div className="form-div">
                            <label htmlFor="job-title">Título do Trabalho</label>
                            <input type="text" name="job-title" placeholder="Título do Trabalho" id="job-title" />
                        </div>

                        <div className="form-div">
                            <label htmlFor="job-description">Descrição do Trabalho</label>
                            <textarea rows={5} name="job-description" placeholder="Descrição do Trabalho" id="job-description" />
                        </div>

                        <div className="form-div">
                            <label htmlFor="uploader">Upload do Currículo</label>
                            <FileUploader onFileSelect={handleFileSelect} />
                        </div>

                        <button className="primary-button" type="submit">Analisar Currículo</button>
                    </form>
                )}
            </section>
        </main>
    );
};

export default Upload;