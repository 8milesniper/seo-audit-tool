
import markdown
from docx import Document
from xhtml2pdf import pisa

def convert_markdown_to_pdf(markdown_file, pdf_file):
    with open(markdown_file, 'r', encoding='utf-8') as f:
        text = f.read()
    html = markdown.markdown(text)
    with open(pdf_file, "w+b") as f:
        pisa_status = pisa.CreatePDF(
                html,
                dest=f)
    return not pisa_status.err

def convert_markdown_to_docx(markdown_file, docx_file):
    with open(markdown_file, 'r', encoding='utf-8') as f:
        text = f.read()
    html = markdown.markdown(text)
    document = Document()
    document.add_paragraph(html)
    document.save(docx_file)

convert_markdown_to_pdf('docs/comprehensive_seo_tool_research.md', 'docs/comprehensive_seo_tool_research.pdf')
convert_markdown_to_docx('docs/comprehensive_seo_tool_research.md', 'docs/comprehensive_seo_tool_research.docx')
