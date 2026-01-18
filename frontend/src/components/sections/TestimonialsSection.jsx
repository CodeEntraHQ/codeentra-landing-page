import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTestimonials } from '../../services/api';
import TestimonialCard from '../../components/ui/TestimonialCard';

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(1);
  const { data: testimonials, isLoading, error } = useQuery({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials
  });

  const fallbackTestimonials = [
    {
      id: '1',
      quote: "codeEntra transformed our outdated systems into a streamlined, modern infrastructure. Their expertise in DevOps was invaluable, and the results have significantly improved our productivity.",
      name: "Abhishek",
      title: "Principal",
      company: "University partner",
      rating: 5
    },
    {
      id: '2',
      quote: "Working with codeEntra on our web application was a game-changer. Their team delivered beyond our expectations, creating an intuitive platform that our users love.",
      name: "Suhani",
      title: "HOD",
      company: "EcoSolutions",
      rating: 5
    },
    {
      id: '3',
      quote: "The cloud migration support from codeEntra was excellent. Their team guided us through every step with clear communication and technical expertise.",
      name: "Sourabh",
      title: "HOC",
      company: "Global client Partners",
      rating: 4
    }
  ];

  const displayTestimonials = isLoading || error ? fallbackTestimonials : (testimonials || fallbackTestimonials);

  return (
    <section id="testimonials" className="section-padding bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-30">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-medium uppercase tracking-wider bg-green-100 text-green-900 rounded-full">
            Testimonials
          </span>
          <h2 className="mb-4 font-bold text-[32px]">
            What Our <span className="text-green-900">Clients Say</span>
          </h2>
          <p className="text-muted-foreground">
            Don't just take our word for it. Here's what some of our clients have to say about working with us.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {displayTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="transition-all duration-300"
              onMouseEnter={() => setActiveTestimonial(Number(testimonial.id))}
              onClick={() => setActiveTestimonial(Number(testimonial.id))}
            >
              <TestimonialCard
                quote={testimonial.quote}
                name={testimonial.name}
                title={testimonial.title}
                company={testimonial.company}
                rating={testimonial.rating}
                isActive={Number(testimonial.id) === activeTestimonial}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          {displayTestimonials.map((testimonial) => (
            <button
              key={testimonial.id}
              className={`w-3 h-3 mx-1 rounded-full transition-all ${
                Number(testimonial.id) === activeTestimonial
                  ? 'bg-green-900 scale-125'
                  : 'bg-green-100'
              }`}
              onClick={() => setActiveTestimonial(Number(testimonial.id))}
              aria-label={`View testimonial from ${testimonial.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
