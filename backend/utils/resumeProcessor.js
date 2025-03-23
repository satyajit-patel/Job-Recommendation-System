const { Document } = require('@langchain/core/documents');
const { ChatGroq } = require('@langchain/groq');
const { PromptTemplate } = require('@langchain/core/prompts');
const { StringOutputParser } = require('@langchain/core/output_parsers');
const { PDFLoader } = require("@langchain/community/document_loaders/fs/pdf");
const { DocxLoader } = require('@langchain/community/document_loaders/fs/docx');
require('dotenv').config();

// Initialize Groq Mixtral model
const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile",
  temperature: 0.2,
});

// Process resume to extract skills
const processResume = async (filePath) => {
  try {
    const loader = new PDFLoader(filePath);
    let docs = await loader.load();

    // Combine all document pages
    const fullText = docs.map(doc => doc.pageContent).join('\n');

    // Create prompt for skill extraction
    const promptTemplate = new PromptTemplate({
      template: `
      You are a resume analysis expert. Extract all technical skills, professional skills, and domain expertise from the following resume text.
      
      Format the output as a JSON array of strings, containing ONLY the skills.
      Include both hard skills (programming languages, tools, platforms) and soft skills (project management, communication).
      
      For example: ["JavaScript", "React", "Node.js", "Project Management", "Data Analysis"]
      
      Resume:
      {resume_text}
      
      Skills (JSON array of strings):`,
      inputVariables: ["resume_text"],
    });

    // Process with LLM
    const chain = promptTemplate.pipe(model).pipe(new StringOutputParser());
    const result = await chain.invoke({
      resume_text: fullText
    });

    // Parse the result to get the skills array
    try {
      const skillsArray = JSON.parse(result.trim());
      return skillsArray;
    } catch (parseError) {
      console.error("Failed to parse skills JSON:", parseError);
      // Fallback: extract skills using regex if JSON parsing fails
      const skillMatches = result.match(/\"([^\"]+)\"/g);
      if (skillMatches) {
        return skillMatches.map(match => match.replace(/\"/g, ''));
      }
      return [];
    }
  } catch (error) {
    console.error("Resume processing error:", error);
    throw new Error(`Failed to process resume: ${error.message}`);
  }
};

module.exports = { processResume };