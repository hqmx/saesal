'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ComparisonSection from '@/components/ComparisonSection';
import ProcessSection from '@/components/ProcessSection';
import SafetySection from '@/components/SafetySection';
import ContactSection from '@/components/ContactSection';
import MeaningSection from '@/components/MeaningSection';
import { useActiveSection } from '@/hooks/useActiveSection';

const siteConfig = {
  "theme": {
    "colors": {
      "primary": "#2563EB",
      "secondary": "#10B981",
      "accent": "#F59E0B", 
      "background": "#F8FAFC",
      "surface": "#FFFFFF",
      "text": {
        "primary": "#336666",
        "secondary": "#336666",
        "muted": "#9CA3AF"
      }
    },
    "typography": {
      "fontFamily": {
        "primary": "'Montserrat', 'Pretendard', system-ui, sans-serif",
        "heading": "'Montserrat', 'Pretendard', system-ui, sans-serif"
      },
      "fontSize": {
        "xs": "0.75rem",
        "sm": "0.875rem",
        "base": "1rem",
        "lg": "1.125rem",
        "xl": "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem"
      }
    }
  },
  "layout": {
    "header": {
      "height": 80,
      "background": "rgba(255, 255, 255, 0.95)",
      "backdropBlur": true,
      "shadow": true
    },
    "container": {
      "maxWidth": "1200px",
      "padding": {
        "mobile": "1rem",
        "tablet": "2rem", 
        "desktop": "3rem"
      }
    }
  },
  "components": {
    "hero": {
      "title": "Do Tattoo<br/>On Tattoo",
      "subtitle": "Ink will Remove",
      "description": "Solution of Remove Ink off your Skin",
      "cta": {
        "primary": "Learn More",
        "secondary": "Contact Us"
      }
    },
    "about": {
      "title": "What is 'Saesal'?",
      "subtitle": "Perfect and Effective way to Remove Tattoo ink of skin",
      "description": "'Saesal' Solve Every Limitation of Laser Treatment",
      "meaning": {
        "title": "Meaning of 'Saesal'",
        "description": "It Means \"New Skin\" in Korean leading to new life with new skin. create a bigger and brighter future."
      }
    },
    "comparison": {
      "title": "Laser vs Saesal",
      "laser": {
        "title": "Limitations of Laser Treatment",
        "issues": [
          {
            "title": "Color Limitation",
            "description": "Laser only works on dark colors. Warm and bright (Red, Yellow, Green) color removal is big limitation."
          },
          {
            "title": "Painful Process", 
            "description": "Technically Laser treatment is burning skin which is most painful issue of humans body. Also it causes burn scars."
          },
          {
            "title": "Long Process",
            "description": "It takes more then 10 sessions to completely remove tattoo. If it's color tattoo, it takes more sessions."
          },
          {
            "title": "Difficult Aftercare",
            "description": "Laser treatment left blister. It's needs more difficult aftercare."
          }
        ]
      },
      "saesal": {
        "title": "What about 'Saesal'?",
        "benefits": [
          {
            "title": "All Colors",
            "description": "'Saesal' works every single colors. Also it works on Cosmetic Tattoo."
          },
          {
            "title": "Safe Process",
            "description": "It's not Laser Removal. 'Saesal' Treatment is same as Tattooing. (To apply, using tattoo needle)"
          },
          {
            "title": "Fast Results",
            "description": "'Saesal' Treatment only takes 4 sessions to completely remove inks. If it's simple line tattoo, it takes only 2 sessions."
          },
          {
            "title": "Easy Aftercare", 
            "description": "'Saesal' treatment only left scabs, like tattoo. And aftercare is also like tattoo."
          }
        ]
      }
    },
    "process": {
      "title": "How 'Saesal' Works",
      "subtitle": "Natural Healing Process",
      "steps": [
        {
          "title": "Treatment Application",
          "description": "Saesal solution treatment works same as tattooing"
        },
        {
          "title": "Natural Scab Formation", 
          "description": "Saesal solution helps Natural healing system make scab with ink"
        },
        {
          "title": "Ink Removal",
          "description": "About 2 weeks later, ink is actually move out of body with scab"
        },
        {
          "title": "Healing Process",
          "description": "Right after scabs fall off, skin looks pink. It's normal natural healing process. About 10-12 weeks later, Skin gets ready to another session."
        }
      ],
      "medical": {
        "title": "Medical Comparison",
        "laser": {
          "title": "Laser Treatment",
          "description": "Laser treatment break ink particle smaller. White blood cell moves ink particles through the vein to kidney"
        },
        "saesal": {
          "title": "Saesal Treatment", 
          "description": "Tattoo ink is stays big particle under the skin. Saesal removes ink particles with natural scab formation"
        }
      }
    },
    "safety": {
      "title": "Solution is Safe?",
      "answer": "Yes!",
      "description": ""
    },
    "contact": {
      "title": "Contact Us !",
      "subtitle": "We are always open",
      "info": {
        "title": "Checklist",
        "items": [
          {
            "title": "Photo Requirements",
            "description": "Please prepare clear photos of your tattoo from different angles with good lighting in natural light"
          },
          {
            "title": "Tattoo History", 
            "description": "When did you get your tattoo? Age of tattoo affects treatment planning and session count"
          },
          {
            "title": "Medical History",
            "description": "Do you have any existing medical conditions, skin disorders, or allergies we should know about?"
          },
          {
            "title": "Skin Conditions",
            "description": "Any current skin treatments, medications, or dermatological conditions in the tattoo area?"
          }
        ]
      },
      "form": {
        "title": "Get In Touch",
        "subtitle": "",
        "fields": [
          {
            "name": "name",
            "label": "Name",
            "type": "text",
            "required": true
          },
          {
            "name": "email",
            "label": "Email",
            "type": "email", 
            "required": true
          },
          {
            "name": "phone", 
            "label": "Phone",
            "type": "tel",
            "required": true
          },
          {
            "name": "location",
            "label": "Location",
            "type": "location",
            "required": true
          },
          {
            "name": "tattooImages",
            "label": "Tattoo Images",
            "type": "file",
            "multiple": true,
            "accept": "image/*"
          },
          {
            "name": "message",
            "label": "Consultation Details",
            "type": "textarea",
            "placeholder": "Please describe your tattoo (size, location, colors, age, etc.) and any specific concerns you have.",
            "required": true
          }
        ]
      }
    }
  }
};

export default function Home() {
  const activeSection = useActiveSection();

  return (
    <div style={{ 
      fontFamily: siteConfig.theme.typography.fontFamily.primary,
      backgroundColor: siteConfig.theme.colors.background,
      color: siteConfig.theme.colors.text.primary
    }}>
      <Navigation activeSection={activeSection} config={siteConfig} />
      <main>
        <HeroSection config={siteConfig} />
        <AboutSection config={siteConfig} />
        <ComparisonSection config={siteConfig} />
        <ProcessSection config={siteConfig} />
        <SafetySection config={siteConfig} />
        <ContactSection config={siteConfig} />
        <MeaningSection config={siteConfig} />
      </main>
    </div>
  );
}