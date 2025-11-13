import { useState, type FormEvent } from "react";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";

const upload = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [file, setFile] = useState<File | null>(null);    

    const handleFileSelect = (file: File | null) => {
        setFile(file);
    }

    const handleAnalyse = async ({companyName, jobTitle, jobDescription, file}: {companyName: string, jobTitle: string, jobDescription: string, file: File}) => {

    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form')
        if (!form) return;
        const formData = new FormData(form);
        const companyName = formData.get('company-name');
        const jobTitle = formData.get('job-title');
        const jobDescription = formData.get('job-description');
        console.log({ companyName, jobTitle, jobDescription, file });
        
        if(!file) return;

        handleAnalyse({companyName: companyName as string, jobTitle: jobTitle as string, jobDescription: jobDescription as string, file});

    }

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
                            <input type="text" name="company-name" placeholder="Nome da Companhia" id="company-name"/>
                        </div>

                        <div className="form-div">
                            <label htmlFor="job-title">Título do Trabalho</label>
                            <input type="text" name="job-title" placeholder="Título do Trabalho" id="job-title"/>
                        </div>

                        <div className="form-div">
                            <label htmlFor="job-description">Descrição do Trabalho</label>
                            <textarea rows={5} name="job-description" placeholder="Descrição do Trabalho" id="job-description"/>
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
}

export default upload