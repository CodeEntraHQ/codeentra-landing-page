-- ============================================================
-- CodeEntra Landing Page - Complete Database Schema
-- ============================================================
-- This file contains all table definitions, indexes, triggers, and initial data
-- Run this file to create all tables at once
-- ============================================================

-- ============================================================
-- 1. ADMIN TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS codeentra."Admin" (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    "profilePhoto" VARCHAR(500),
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_admin_email ON codeentra."Admin"(email);

CREATE TRIGGER update_admin_updated_at 
    BEFORE UPDATE ON codeentra."Admin"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

INSERT INTO codeentra."Admin" (id, email, password) VALUES
('admin001', 'codeentrasocial10@gmail.com', '$2b$10$rQ8K8K8K8K8K8K8K8K8K.8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 2. CONTACT INFO TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS codeentra."ContactInfo" (
    id VARCHAR(255) PRIMARY KEY,
    type VARCHAR(50) NOT NULL CHECK (type IN ('office', 'email', 'phone')),
    label VARCHAR(255) NOT NULL,
    value TEXT NOT NULL,
    "orderIndex" INTEGER DEFAULT 0,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_contact_info_type ON codeentra."ContactInfo"(type);
CREATE INDEX IF NOT EXISTS idx_contact_info_active ON codeentra."ContactInfo"("isActive");
CREATE INDEX IF NOT EXISTS idx_contact_info_order ON codeentra."ContactInfo"("orderIndex");

CREATE TRIGGER update_contact_info_updated_at 
    BEFORE UPDATE ON codeentra."ContactInfo"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

INSERT INTO codeentra."ContactInfo" (id, type, label, value, "orderIndex", "isActive") VALUES
('cont001', 'office', 'Our Office', 'CodeEntra Unlocking Solutions Pvt. Ltd.
Khata No. 64, Bhagwat Nag, Adarsh Colony, Kumhrar, Patna- 800026, Bihar', 1, true),
('cont002', 'email', 'Email Us', 'info@codeentra.com', 2, true),
('cont003', 'phone', 'Call Us', '+(91) 8105791804', 3, true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 3. CONVERSATION FLOW TABLE (CHATBOT)
-- ============================================================
CREATE TABLE IF NOT EXISTS codeentra."ConversationFlow" (
    id VARCHAR(255) PRIMARY KEY,
    question TEXT NOT NULL,
    options JSONB NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_initial BOOLEAN NOT NULL DEFAULT FALSE,
    order_index INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_conversation_is_active ON codeentra."ConversationFlow"("is_active");
CREATE INDEX IF NOT EXISTS idx_conversation_is_initial ON codeentra."ConversationFlow"("is_initial");
CREATE INDEX IF NOT EXISTS idx_conversation_order ON codeentra."ConversationFlow"("order_index");

CREATE TRIGGER update_conversation_updated_at 
    BEFORE UPDATE ON codeentra."ConversationFlow"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

INSERT INTO codeentra."ConversationFlow" (id, question, options, is_active, is_initial, order_index) VALUES
('conv001', 'Hello! I am codeEntra assistant. What would you like to know about?', 
 '[{"option": "Our Services", "answer": "Great! We offer comprehensive technology services. What service interests you?", "nextQuestionId": "conv002"}, {"option": "Internship Program", "answer": "Excellent choice! We offer amazing internship opportunities. What would you like to know?", "nextQuestionId": "conv003"}, {"option": "About codeEntra", "answer": "codeEntra is a leading technology solutions provider founded in 2025. What would you like to know?", "nextQuestionId": "conv004"}, {"option": "Contact Us", "answer": "You can reach us through our contact form on this page or email us directly. We would love to hear from you!", "nextQuestionId": null}]'::jsonb,
 TRUE, TRUE, 1),
('conv002', 'Which service interests you?',
 '[{"option": "Web Development", "answer": "Our Web Development service includes custom websites and web applications built with the latest technologies to create powerful digital experiences tailored to your business needs.", "nextQuestionId": null}, {"option": "DevOps Solutions", "answer": "DevOps Solutions include streamlined development workflows, CI/CD pipelines, and infrastructure automation to improve your delivery process and operational efficiency.", "nextQuestionId": null}, {"option": "Cloud Services", "answer": "We provide expert cloud solutions for AWS, Azure, and GCP to help you scale your infrastructure efficiently and securely.", "nextQuestionId": null}, {"option": "UX/UI Design", "answer": "UX/UI Design service focuses on user-centered design that creates intuitive, engaging, and accessible digital experiences that convert visitors to customers.", "nextQuestionId": null}, {"option": "IT Consulting", "answer": "IT Consulting provides strategic technology consulting to help your business make the right decisions for sustainable growth and innovation.", "nextQuestionId": null}, {"option": "Cybersecurity", "answer": "We offer comprehensive security solutions to protect your business from threats and ensure compliance with regulations.", "nextQuestionId": null}]'::jsonb,
 TRUE, FALSE, 2),
('conv003', 'What would you like to know about our internship program?',
 '[{"option": "How to Apply", "answer": "You can apply for internships by visiting our Career section on the website. Fill out the internship application form with your details, skills, and preferences.", "nextQuestionId": null}, {"option": "Program Duration", "answer": "Internship programs are available in various durations (typically 1-6 months) depending on the program. Check our Career section for specific duration options.", "nextQuestionId": null}, {"option": "Benefits", "answer": "Interns receive continuous learning opportunities, mentorship from industry experts, real project experience, and the chance to build their professional network.", "nextQuestionId": null}, {"option": "Requirements", "answer": "We look for passionate individuals with basic programming knowledge and eagerness to learn. Check our Career section for specific requirements.", "nextQuestionId": null}]'::jsonb,
 TRUE, FALSE, 3),
('conv004', 'What would you like to know about codeEntra?',
 '[{"option": "Company Overview", "answer": "codeEntra is a leading technology solutions provider founded in 2025. We specialize in empowering businesses with innovative technology solutions that drive growth and success.", "nextQuestionId": null}, {"option": "Our Mission", "answer": "We combine technical expertise with a deep understanding of business needs to deliver solutions that not only solve problems but create opportunities for our clients.", "nextQuestionId": null}, {"option": "Our Team", "answer": "Our team of dedicated professionals is passionate about technology and committed to excellence in everything we do.", "nextQuestionId": null}]'::jsonb,
 TRUE, FALSE, 4)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 4. FAQS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS codeentra."FAQs" (
    id VARCHAR(255) PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100) NOT NULL DEFAULT 'general',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_faqs_category ON codeentra."FAQs"(category);
CREATE INDEX IF NOT EXISTS idx_faqs_is_active ON codeentra."FAQs"("is_active");
CREATE INDEX IF NOT EXISTS idx_faqs_created_at ON codeentra."FAQs"("createdAt");

CREATE TRIGGER update_faqs_updated_at 
    BEFORE UPDATE ON codeentra."FAQs"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

INSERT INTO codeentra."FAQs" (id, question, answer, category, is_active) VALUES
('faq001', 'What services does codeEntra offer?', 'codeEntra offers comprehensive technology services including Web Development, DevOps Solutions, Cloud Services (AWS, Azure, GCP), UX/UI Design, IT Consulting, and Cybersecurity solutions.', 'services', TRUE),
('faq002', 'What is Web Development service?', 'Our Web Development service includes custom websites and web applications built with the latest technologies to create powerful digital experiences tailored to your business needs.', 'services', TRUE),
('faq003', 'What are DevOps Solutions?', 'DevOps Solutions include streamlined development workflows, CI/CD pipelines, and infrastructure automation to improve your delivery process and operational efficiency.', 'services', TRUE),
('faq004', 'Which cloud platforms do you support?', 'We provide expert cloud solutions for AWS (Amazon Web Services), Azure (Microsoft Azure), and GCP (Google Cloud Platform) to help you scale your infrastructure efficiently and securely.', 'services', TRUE),
('faq005', 'What is UX/UI Design service?', 'UX/UI Design service focuses on user-centered design that creates intuitive, engaging, and accessible digital experiences that convert visitors to customers.', 'services', TRUE),
('faq006', 'What does IT Consulting include?', 'IT Consulting provides strategic technology consulting to help your business make the right decisions for sustainable growth and innovation.', 'services', TRUE),
('faq007', 'What Cybersecurity services do you offer?', 'We offer comprehensive security solutions to protect your business from threats and ensure compliance with regulations.', 'services', TRUE),
('faq008', 'Do you offer internship programs?', 'Yes! codeEntra offers amazing internship opportunities where you can learn from industry experts, work on real projects, and build your professional network.', 'internship', TRUE),
('faq009', 'How can I apply for an internship?', 'You can apply for internships by visiting our Career section on the website. Fill out the internship application form with your details, skills, and preferences.', 'internship', TRUE),
('faq010', 'What is the duration of internship programs?', 'Internship programs are available in various durations (typically 1-6 months) depending on the program. Check our Career section for specific duration options.', 'internship', TRUE),
('faq011', 'What benefits do interns receive?', 'Interns receive continuous learning opportunities, mentorship from industry experts, real project experience, and the chance to build their professional network.', 'internship', TRUE),
('faq012', 'What is codeEntra?', 'codeEntra is a leading technology solutions provider founded in 2025. We specialize in empowering businesses with innovative technology solutions that drive growth and success.', 'company', TRUE),
('faq013', 'How can I contact codeEntra?', 'You can reach us through our contact form on the website, email us directly, or visit our contact section. We would love to hear from you!', 'company', TRUE),
('faq014', 'What makes codeEntra different?', 'codeEntra combines technical expertise with a deep understanding of business needs to deliver solutions that not only solve problems but create opportunities for our clients.', 'company', TRUE),
('faq015', 'How do I get started with codeEntra?', 'Getting started is easy! Simply visit our Contact section, fill out the contact form, or click the "Get Started" button. Our team will reach out to discuss your requirements.', 'general', TRUE),
('faq016', 'What is the pricing for services?', 'Pricing varies based on the project scope and requirements. Please contact us through our contact form for a customized quote tailored to your needs.', 'general', TRUE),
('faq017', 'Do you provide ongoing support?', 'Yes, we provide ongoing support and maintenance for all our solutions to ensure your systems run smoothly and stay updated.', 'general', TRUE)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 5. FOOTER TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS codeentra."Footer" (
    id VARCHAR(255) PRIMARY KEY,
    section VARCHAR(50) NOT NULL CHECK (section IN ('company', 'services', 'companyLinks', 'social', 'copyright')),
    title VARCHAR(255),
    content TEXT,
    url VARCHAR(500),
    icon VARCHAR(50),
    "orderIndex" INTEGER DEFAULT 0,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_footer_section ON codeentra."Footer"(section);
CREATE INDEX IF NOT EXISTS idx_footer_active ON codeentra."Footer"("isActive");
CREATE INDEX IF NOT EXISTS idx_footer_order ON codeentra."Footer"("orderIndex");

CREATE TRIGGER update_footer_updated_at 
    BEFORE UPDATE ON codeentra."Footer"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

INSERT INTO codeentra."Footer" (id, section, title, content, url, icon, "orderIndex", "isActive") VALUES
('foot001', 'company', 'codeEntra', 'Providing innovative tech unlocking solutions to help your business grow and succeed in the digital landscape.', NULL, NULL, 1, true),
('foot002', 'services', 'Services', 'Web Development', '#', NULL, 1, true),
('foot003', 'services', 'Services', 'DevOps Solutions', '#', NULL, 2, true),
('foot004', 'services', 'Services', 'Cloud Services', '#', NULL, 3, true),
('foot005', 'services', 'Services', 'UX/UI Design', '#', NULL, 4, true),
('foot006', 'companyLinks', 'Company', 'About Us', '#about', NULL, 1, true),
('foot007', 'companyLinks', 'Company', 'Our Team', '#', NULL, 2, true),
('foot008', 'companyLinks', 'Company', 'Careers', '#', NULL, 3, true),
('foot009', 'companyLinks', 'Company', 'Contact Us', '#contact', NULL, 4, true),
('foot010', 'social', 'Connect', NULL, 'https://www.facebook.com/people/codeEntra/61577066431979/?sk=about', 'facebook', 1, true),
('foot011', 'social', 'Connect', NULL, 'https://x.com/codeentra?s=21', 'twitter', 2, true),
('foot012', 'social', 'Connect', NULL, 'https://www.instagram.com/codeentra?igsh=MWtqbHk0eHJ2cnZobA%3D%3D&utm_source=qr', 'instagram', 3, true),
('foot013', 'social', 'Connect', NULL, 'https://www.linkedin.com/company/codeentra/', 'linkedin', 4, true),
('foot014', 'copyright', NULL, '© 2025 codeEntra. All rights reserved.', NULL, NULL, 1, true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 6. NAVBAR TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS codeentra."Navbar" (
    id VARCHAR(255) PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    "orderIndex" INTEGER DEFAULT 0,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_navbar_active ON codeentra."Navbar"("isActive");
CREATE INDEX IF NOT EXISTS idx_navbar_order ON codeentra."Navbar"("orderIndex");

CREATE TRIGGER update_navbar_updated_at 
    BEFORE UPDATE ON codeentra."Navbar"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

INSERT INTO codeentra."Navbar" (id, label, url, "orderIndex", "isActive") VALUES
('nav001', 'Services', '#services', 1, true),
('nav002', 'About', '#about', 2, true),
('nav003', 'Products', '#products', 3, true),
('nav004', 'Testimonials', '#testimonials', 4, true),
('nav005', 'Career', '#career', 5, true),
('nav006', 'Contact', '#contact', 6, true),
('nav007', 'Get Started', '#contact', 7, true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 7. PRODUCTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS codeentra."Products" (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    url VARCHAR(500) NOT NULL,
    icon VARCHAR(50) NOT NULL DEFAULT 'Sparkles',
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    order_index INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_is_active ON codeentra."Products"("is_active");
CREATE INDEX IF NOT EXISTS idx_products_order_index ON codeentra."Products"("order_index");
CREATE INDEX IF NOT EXISTS idx_products_created_at ON codeentra."Products"("createdAt");

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON codeentra."Products"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

INSERT INTO codeentra."Products" (id, name, description, url, icon, features, is_active, order_index) VALUES
('prod001', 'ExamEntra', 'A comprehensive examination management platform designed to streamline the entire exam process. From creation to evaluation, ExamEntra makes exam management effortless and efficient.', 'https://examentra.homelabcraft.ovh/', 'Sparkles', 
 '["Easy Exam Creation", "Automated Evaluation", "Real-time Analytics", "Secure Platform"]'::jsonb,
 TRUE, 1)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 8. SERVICES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS codeentra."Services" (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    full_description TEXT,
    icon VARCHAR(255) NOT NULL DEFAULT 'code',
    is_active BOOLEAN NOT NULL DEFAULT true,
    order_index INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_services_is_active ON codeentra."Services"(is_active);
CREATE INDEX IF NOT EXISTS idx_services_order_index ON codeentra."Services"(order_index);

CREATE TRIGGER update_services_updated_at 
    BEFORE UPDATE ON codeentra."Services"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

INSERT INTO codeentra."Services" (id, title, description, full_description, icon, is_active, order_index) VALUES
('srv001', 'Web Development', 'Custom websites and web applications built with the latest technologies to create powerful digital experiences.', NULL, 'code', true, 1),
('srv002', 'DevOps Solutions', 'Streamlined development workflows, CI/CD pipelines, and infrastructure automation to improve your delivery process.', NULL, 'settings', true, 2),
('srv003', 'Cloud Services', 'Expert cloud solutions for AWS, Azure, and GCP to help you scale your infrastructure efficiently and securely.', NULL, 'cloud', true, 3),
('srv004', 'UX/UI Design', 'User-centered design that creates intuitive, engaging, and accessible digital experiences that convert visitors to customers.', NULL, 'design', true, 4),
('srv005', 'IT Consulting', 'Strategic technology consulting to help your business make the right decisions for sustainable growth and innovation.', NULL, 'consulting', true, 5),
('srv006', 'Cybersecurity', 'Comprehensive security solutions to protect your business from threats and ensure compliance with regulations.', NULL, 'security', true, 6),
('srv007', 'IT Staffing Solutions', 'Expert IT professionals and technical talent on-demand. We provide skilled employees to companies needing qualified staff for their projects and operations.', NULL, 'staffing', true, 7),
('srv008', 'Website Maintenance & Support', 'Comprehensive website maintenance services including updates, security patches, performance optimization, and ongoing support for colleges, institutions, and businesses.', NULL, 'maintenance', true, 8),
('srv009', 'Marketing & Advertisement Services', 'Comprehensive marketing and promotional services for your business or college. We organize seminars, workshops, and promotional events in other institutions and schools to expand your reach and visibility.', 'We provide end-to-end marketing and advertisement solutions tailored for businesses and educational institutions. Our services include organizing seminars and workshops in partner institutions and schools, creating promotional campaigns, managing event logistics, and ensuring maximum visibility for your brand. Whether you''re a college looking to attract students or a business seeking to expand your market presence, we help you connect with your target audience through strategic marketing initiatives.', 'marketing', true, 9)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 9. TESTIMONIALS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS codeentra."Testimonials" (
    id VARCHAR(255) PRIMARY KEY,
    quote TEXT NOT NULL,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    is_active BOOLEAN NOT NULL DEFAULT true,
    order_index INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_testimonials_is_active ON codeentra."Testimonials"(is_active);
CREATE INDEX IF NOT EXISTS idx_testimonials_order_index ON codeentra."Testimonials"(order_index);

CREATE TRIGGER update_testimonials_updated_at 
    BEFORE UPDATE ON codeentra."Testimonials"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

INSERT INTO codeentra."Testimonials" (id, quote, name, title, company, rating, is_active, order_index) VALUES
('tst001', 'codeEntra transformed our outdated systems into a streamlined, modern infrastructure. Their expertise in DevOps was invaluable, and the results have significantly improved our productivity.', 'Abhishek', 'Principal', 'University partner', 5, true, 1),
('tst002', 'Working with codeEntra on our web application was a game-changer. Their team delivered beyond our expectations, creating an intuitive platform that our users love.', 'Suhani', 'HOD', 'EcoSolutions', 5, true, 2),
('tst003', 'The cloud migration support from codeEntra was excellent. Their team guided us through every step with clear communication and technical expertise.', 'Sourabh', 'HOC', 'Global client Partners', 4, true, 3)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- END OF SCHEMA
-- ============================================================
