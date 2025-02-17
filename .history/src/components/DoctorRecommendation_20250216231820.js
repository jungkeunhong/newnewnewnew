import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, MapPin, ChevronRight } from 'lucide-react';
import Analytics from '../utils/analytics';

const DoctorRecommendation = ({ treatment, onBack, onDoctorClick, onTreatmentClick }) => {
  const doctorsByTreatment = {
    botox: [
      {
        id: 'dr-marotta',
        name: "Dr. James C. Marotta, MD",
        title: "Board Certified Facial Plastic Surgeon",
        clinic: "Marotta Facial Plastic Surgery",
      rating: 4.9,
        reviews: 'https://www.google.com/maps/search/?api=1&query=Marotta+Facial+Plastic+Surgery+Smithtown+NY',
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREofNWqHa3Yj0_h_FE7O1PkVdYTNIwd3u8cw&s",
        expertise: ["Botox", "Active FX", "Laser"],
        education: [
          "BA, Columbia University, New York, NY",
          "MD, SUNY Stony Brook, School of Medicine",
          "Fellowship: Facial Plastic and Reconstructive Surgery, Quatela Center"
        ],
        intro: "Expertise. Innovation. Compassionate care. The primary reasons Dr. Marotta has been consistently named Best Cosmetic Surgeon on Long Island can be found in his commitment to his patients. Combined with his dual-board certification, his Ivy League education and his impeccable credentials.",
        languages: ["English"],
        location: "895 W. Jericho Tpke., Smithtown, NY",
        website: "https://marottamd.com/",
        treatments: [
          {
            name: "Botox",
            description: "A treatment that temporarily relaxes muscles to reduce wrinkles and refresh the face naturally",
            time: "10–15 minutes",
            price: "$15 per unit (20-40 units)\nFirst-time patients: $200 per area"
          }
        ]
      },
      {
        id: 'dr-schwarzburg',
        name: "Dmitriy Schwarzburg, MD",
        title: "Board-Certified Expert in Minimally Invasive Cosmetic & Laser Medicine",
        clinic: "Skinly Aesthetics",
        rating: 4.6,
        reviews: 'https://www.google.com/maps/search/?api=1&query=Skinly+Aesthetics+New+York',
        image: "data:image/jpeg;base64,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",
        expertise: ["Botox", "Juvederm", "Active FX"],
        intro: "Dr. Schwarzburg is a top cosmetic expert in NYC, specializing in minimally invasive treatments to enhance natural beauty.",
        education: [
          "Bachelor's in Molecular Biology, Magna Cum Laude, University of Texas at Dallas",
          "Medical Degree, McGovern Medical School, Houston",
          "Surgical Training, North Shore LIJ Hospital, New York"
        ],
        languages: ["English"],
        location: "157 E 64th St 2nd floor, New York, NY 10065",
        website: "https://skinlyaesthetics.com/",
        treatments: [
          {
            name: "Botox",
            description: "Precise muscle relaxation for natural wrinkle reduction and prevention",
            time: "15–20 minutes",
            price: "$15 per unit (20-40 units)\nFirst-time patients: $200 per area"
          }
        ]
      },
      {
        id: 'dr-ferzli',
        name: "Dr. Georgina Ferzli",
        title: "Board-Certified Dermatologist",
        clinic: "Tribeca MedSpa",
        rating: 4.8,
        reviews: 'https://www.google.com/maps/search/?api=1&query=Tribeca+MedSpa+New+York',
        image: "https://www.tribecamedspa.com/wp-content/uploads/2023/12/Dr-Georgina-Ferzli-MD-MS-FAAD-Director-of-Cosmetic-Dermatology.jpeg",
        expertise: ["Botox", "Laser Resurfacing", "Acne Scar Treatment", "Skin Tightening"],
        intro: "Dr. Ferzli is a top dermatologist in NYC, specializing in cosmetic and laser dermatology.",
        education: [
          "B.S., Georgetown University (2008)",
          "M.S., Georgetown University (2009)",
          "M.D., SUNY Downstate Medical Center (2013)"
        ],
        languages: ["English"],
        location: "114 Hudson St, New York, NY 10013",
        website: "https://www.tribecamedspa.com/",
        treatments: [
          {
            name: "Botox",
            description: "A treatment that temporarily relaxes muscles to reduce wrinkles and refresh the face naturally",
            time: "10–15 minutes",
            price: "$1260 ($18 per unit, 70 units)\nFirst-time offer: $50 discount"
          }
        ]
      }
    ],
    filler: [
      {
        id: 'james-christian',
        name: "James Christian",
        title: "Authorized Vampire Facelift® Professional, Injectable Expert & Certified Galderma Trainer",
        clinic: "James Christian Cosmetics",
      rating: 4.8,
        reviews: 'https://jameschristiancosmetics.com/wp-content/uploads/jcc-img-profile.jpg',
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d",
        expertise: ["Injections", "Botox", "Filler"],
        intro: "James Christian is the Director of Operations and founder of James Christian Cosmetics, specializing in injectable fillers, muscle relaxants, and advanced aesthetic techniques.",
        education: [
          "B.S., Florida Atlantic University",
          "Allied Health Sciences, Touro College",
          "Physician Assistant License",
          "Advanced training under top plastic surgeons in NYC"
        ],
        languages: ["English"],
        location: "New York, NY",
        website: "https://jameschristiancosmetics.com/",
        treatments: [
          {
            name: "Sculptra Filler",
            description: "Help replenish facial volume that has been lost due to aging with a Sculptra 1cc filler treatment.",
            time: "30–60 minutes",
            price: "$900 - 1 Vial\n$1700- 2 Vials\n$2400- 3 Vials\n$2600- 4 Vials"
          }
        ]
      },
      {
        id: 'julija-dimante',
        name: "Julija DiMante, RN, BSN",
        title: "Founder & CEO of Diamond Advanced Aesthetics, Board-Certified Registered Nurse",
        clinic: "Diamond Advanced Aesthetics",
        rating: 5.0,
        reviews: 'https://www.google.com/maps/search/?api=1&query=Diamond+Advanced+Aesthetics',
        image: "https://diamondadvancedaesthetics.com/storage/2024/04/julija-dimante-by-diamond-advanced-aesthetics-in-new-york-ny.webp",
        expertise: ["Injectable Fillers", "Botox", "Natural Aesthetic Enhancements", "Skin Rejuvenation"],
        intro: "Julija DiMante is a skilled injector and aesthetic expert, known for delivering natural and transformative results. She is the founder of Diamond Advanced Aesthetics and an educator in the aesthetics industry.",
        education: [
          "Board-Certified Registered Nurse (RN, BSN)",
          "Founder & CEO of Diamond Advanced Aesthetics",
          "Master Trainer for Suneva Medical",
          "Speaker for Candela"
        ],
        languages: ["English"],
        location: "New York, NY",
        website: "https://diamondadvancedaesthetics.com/",
        treatments: [
          {
            name: "Restylane Contour",
            description: "It is ideal for enhancing cheek volume and correcting deficiencies in midface contour.",
            time: "30–60 minutes",
            price: "$900 (per syringe)"
          }
        ]
      },
      {
        id: 'dr-vivian-chin',
        name: "Dr. Vivian Chin, MD, MPH",
        title: "Cosmetic Physician, Skin & Wellness Expert",
        clinic: "Vivian Chin MD",
        rating: 4.9,
        reviews: 'https://www.google.com/maps/search/?api=1&query=Vivian+Chin+MD',
        image: "https://korunyc.com/wp-content/uploads/2017/06/chin.jpg",
        expertise: ["Skin Rejuvenation", "Holistic Medicine", "Personalized Skincare"],
        intro: "Dr. Vivian Chin is a cosmetic physician specializing in skin care, wellness aesthetics, and holistic beauty. She combines medical expertise with aesthetic training to provide personalized skin care regimens.",
        education: [
          "B.A., Vassar College",
          "MPH, Columbia University Mailman School of Public Health",
          "M.D., New York University School of Medicine"
        ],
        languages: ["English"],
        location: "New York, NY",
        website: "https://vivianchinmd.com/",
        treatments: [
          {
            name: "Dermal Filler",
            description: "Dermal fillers restore volume, smooth wrinkles, and enhance facial contours with results lasting 6–18 months.",
            time: "30–60 minutes",
            price: "Syringe Price: $800 – $1,000 each\nPartial Syringe: $595"
          }
        ]
      }
    ],
    microneedling: [
      {
        id: 'samantha-danesi',
        name: "Samantha Danesi, RPA-C, LMT",
        title: "Certified Physician Assistant (RPA-C)",
        clinic: "Samantha Danesi Aesthetics",
      rating: 4.7,
        reviews: 'https://www.google.com/maps/search/?api=1&query=Samantha+Danesi+Aesthetics',
        image: "data:image/jpeg;base64,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",
        expertise: ["Advanced cosmetic injectables", "Tear trough treatments", "Liquid facelifts"],
        intro: "Samantha Danesi is a certified Physician Assistant and Licensed Massage Therapist with over a decade of experience in aesthetics and plastic surgery. She specializes in advanced cosmetic injectables, including tear trough treatments, liquid facelifts, and non-surgical Brazilian Butt Lifts (BBL).",
        education: [
          "Certified Physician Assistant (RPA-C)",
          "Licensed Massage Therapist (LMT)"
        ],
        languages: ["English"],
        location: "New York, NY",
        website: "https://samanthadanesiaesthetics.com/",
        treatments: [
          {
            name: "SkinFix: Microneedling",
            description: "SkinPen (Microneedling) is designed to stimulate your skin's natural ability to produce new collagen formation creating healthier, younger-looking skin. Get smoother more toned skin, hassle-free",
            time: "60 minutes",
            price: "$300.00"
          }
        ]
      },
      {
        id: 'shannon-lee',
        name: "Shannon Lee",
        title: "Founder & Lead Esthetician of Shannon Lee Esthetics",
        clinic: "Shannon Lee Esthetics",
        rating: 4.6,
        reviews: 'https://www.google.com/maps/search/?api=1&query=Shannon+Lee+Esthetics',
        image: "https://images.squarespace-cdn.com/content/v1/63e146735db8872a79265dc0/6fb7b053-086c-4c8f-be26-916f52f77749/Untitled+design+%282%29.jpg",
        expertise: ["Acne Treatments", "Hyperpigmentation Correction", "Skin Rejuvenation", "Custom Facials"],
        intro: "Shannon Lee is a skincare expert specializing in acne and hyperpigmentation treatments. Her journey began with her own skin struggles, leading her to build a thriving esthetics business in New York City.",
        education: ["Licensed Esthetician"],
        languages: ["English"],
        location: "New York, NY",
        website: "https://shannonleeesthetics.com/",
        treatments: [
          {
            name: "MD Pen MicroNeedling",
            description: "A medical-grade microneedling treatment that creates 15,000 micro-channels per square inch to stimulate collagen production, improve skin texture, and reduce scars, fine lines, and hyperpigmentation.",
            time: "30–60 minutes",
            price: "$350"
          }
        ]
      },
      {
        id: 'diana-seo',
        name: "Diana Seo",
        title: "Founder & President of Collagen Bar",
        clinic: "Collagen Bar",
        rating: 4.9,
        reviews: 'https://www.google.com/maps/search/?api=1&query=Collagen+Bar',
        image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSExMVFhUXGBcYFRUXFRUVFRgXGBUWFhcXFhUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy0dHx8rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rKy0rLS0tLS0tLS0tLS0rLS0tLf/AABEIAQcAwAMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQIDBAUHBgj/xAA+EAABAwIDBQYEBQQBAwUBAAABAAIDESEEBTEGEkFRYQcTInGBkTKhsdEUQlLB8CMzYnLhgqLxQ2NzktIk/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECBAMF/8QAJBEBAQACAgICAgIDAAAAAAAAAAECEQMhEjEEQSJRMmFCgfD/2gAMAwEAAhEDEQA/ANZQQQTIEaJBAAoIIIAIyiCBKDBMYzGRxMMkr2xsH5nuDR89Vxm2faJFhqxYcCafqaRs6uPE9FkuaZpLiH95iZHSvNwCfC3oxmjfNPx6L36bBi+0vBtJ7sSSgaua2jfMF1KqJF2sYImj2ys67oIHWxWJY3EusKAchclRmMcTelLVFeCWz09DYrtAwLWB4na5p0DbvJ5bvAKDhu0/CF1C2Vo/UQC3/tuFheNw265xj8TNQQakDkUMHjnaVHUGyfWi1XqHKc6w+IbvQyseOhuPMahWK8tYLMnxPD43vheDZ7D9eBHQrU9jO08EiHHUYTZs7fgPLvB+Xz0SPTUkElpqAQQQbgi4IOhB5JSQGgiQQBoIkaACCCCASgiQTIaCJBAGggiQAJXBdpO2H4aMwxn+q8Wp+Uabzv2C6vPsybh4Xyu0aCT9l5wzjMn4iZ87z4nE7vTlToFeE+039Ca81PM3c43JP36qMTW4vTV35R90y29qnd5DVx//ACpFuPD2HoqyXAhaBepuL8z68Ao88oBt6Bot9ypeEwEk5o2zBxpr911mUbHxi7hfqsmfLMa08fBlk4vBwvcbAhWOO2eeWh+7QnjwP2K1fKsjY0WYP5zUvE5a3cpu+lFwvyLvbRPi/W2BCRzDuut56f8AhT4HClvY3HlXkus2k2Uq6reOhXIYvBSQGpFW8/utGPJjkzZ8OWPtpnZnt2IS3B4l/wDRJ3YZXf8ApuJ/tuP6DwPBbCRQryoXNcN4XHEdOoWzdkW1hxEZwUziZYm1icTeSHSh5uZYeVF0cbGio0SAQkaNEggAggggEoIIJkCCCCACIlAqNmGMZDE+aQ0ZG0uPoNPNAZZ2zbQXZgmG7vHL0ANGNPIm59Fk80grQaDU9FOzvM3TSyYh48crifIVsB5Ciqgafv8AZdv6KJMT6Drw6BPYCLvnhn5Qb9VXucTYequ9mYjvgDSo9Vx5crp24pvJoWT5UGgCi6rAYIWJUbLIbC3BXkMa8u91629Q7G0AUomcQxPiqRKnrpMvanxeHBsuXzfK2kFjguylVXjI6rnLqu+tztiuZYF2Gltdp/lFKyjNX4WePExnxRODh1b+Zh8xUK92ywdWO5i452XHQzVp1+oXo8eXljt5XNh4ZaessHiGyRskZ8L2hzfJwqB806uE7Hs073AiImroHujvruHxMr5Akei7pdWazQ0aJBBDQQQQCUESCZDRFBAoALOe2bNg3DNwoN5XVd/oz7uotEc6gWBdqGad5jH0+GICMdSLut5qsf2PbiMW7xeX8Cjk8B/ChI/+dU2Ci00vCYcucGgVJsBzWn7JbOCOj33d8vRcv2fYDfkMhFSNPVa7gsKA3TgsPPyW3xj0fj8cmPlSoYnCzGivM/CPulzYOfVs9DwG7Rqe36caKLLmuGB3XYiMO/SZAPRcJqO17RYdpAx/dYhpa7g+h3D6qylxLXUINRwIVZjoo3gtNCD1r6gpOWYQsBbWo4eSLltcw1Vgo08ace+llSZrn+4dxkbpHDWnBRrbp5aUm00NQa9R6LKdCRyK0rN8wneC8wkNANbXHVZriT43ea2fGlkrB8uy2Vq3YjmFMTJHW0sdaf5xn7FbUF5v7KcZuZjhxWlXEHyIovR7FpjFkUjRI00hVBBBAJQQQQQIIkKoCJmk+5G5w1oaefBeZdoJqyPJNSXuNed1vu3mYd1hZHVpanvay86Zhw8qn3Veoc9oDjdFEKlAJ7Bx1cB1XO3ra5N1qvZ5gt2IGnxXWkYdllxuy7N1jByAXYwThed7yterrWMkQM5yZkrSHb+nB1Fn2c7DyF5fBKxoczu3tLaO3D8R6uoFrVQQq7Fwg8FcyuHorjM5rJxUUfcujZE2TuwGsdv8wKb1Boa68F2GAZa+qZhwQrYK0w8O6DXVRvd2u9TSmxB8W6oOLxuGiJD5Y2kUrvOAIrpXl6qbMwl8gBoS0gOGorao6hcXmew8bpe8Ejm1IL4z8L6cd7mdTVGHjffQzuU/jNrfNMS0sJBDmkEVBBGnMLFMUPG6nM/VadnOBkE28xrWsc2jmtNRb4SeqzXGso945E/VafjyS3XbJ8u2ydaTdnMYYcVDKDTde019aFeroX1APMAjyIqvH7Ddeq9kcR3mCw7v/baD6Ci0xivpcoIkaaQRokEAlBBBBAkuKNIcUBnPa/i6Qxx8XVNOg1KxTNHeKnQLTe1rFb2Ja2vwsoelTUrL8aaqr6ViYaw0CscniG8018+l1G3bN6C6dyV27OBzsuXJPxdOO6yjY8lb4W+QV4yRU+SCsYVi6oXmvWxWuFnRYmQDiq6OVImcXGl1Vy6X497WOBeXE7vup7bA116LncT3zQe63bi1andPCrRqFAjzaaMH8Q9rjwexrm16FnNL6Rcd3cWrxSXzTksdVS5dmpmdQsc29W72pA/MR+XyKu3OUx0VePwooVhuatpNIP8AJy3LOJw1jnHgCT6LCMXNvPc/m4n3K1fF91i+brUMx3qvS3ZdPvZbATTiLfzVebsFHV1Oh+S9E9kjKZbGNal31Wqe2C+naBGkgo00DRpKNAEggiTIExiH0BKfKiZgfCU4GFdouJLsXJW9AL8OdKeq4WW66XafFF88p1q91+YBp+y5qlR5XTyXj6SW03R5U/8AKjNfuva7kQn6+EFMObVTQ2fZbEB0beoV++MG/HT2Wadnua1HdE+JunktKilqF5mc8crHq8eXljKafQXUGDOYQTWQEg3AuR50U3FRb4pw4qkxuRxNk7wN3SSD4TQOI4OU447rTj30t351AaAF1ePhUZ+Ji13hfSqRg8Lh2jdmDiaGj76k9OACh5xl2HaAYpXOceFC4V68l2vHdCeMurLFsHAUpx/nqlzT0XP5Ayc17wBra+FtamnVWOZOABqdBUnkAs96uhbpyPaJn4EfcMN3fEeizlwspmcYvvpnycK0b/qNFEeV6fFh4Y6eLzcl5M9n8BSprXQgU1qdF6Z2Gw3d4GBtPyA6U16LzTlkZMjGjUvaB7hersHGGMYwaNaB7C6qe030fCNJRpuZSCII0GJBBBNJLlWZ/JuwuPQn2FVZuXPbbS0w0n+p+YTgeecykq7eveqr43AfJSsUVBfanoiukTd3w0H8uozNPJS62r0UWPVw4FBJGAxbopBK3hr1HFa/s/m7Jow4H/jzWS5ThTId0a0NvLkrnLHyYYh7K7h1HI8QVi+RN3bd8e2T+mwxNqE3icPUEEV/mqpshz5sgF6HkV0ccrXUNQs+Oq17+45yRz2At1byOoUV8rnW3adV0k0Y0sVFdENaIuVjROW6RoKMHlquB292h1w0Zu7+6RwH6fNWe2W1TYAYo6GU+zep69Fl5eSSTck1JOvVd+Di3+WTzflc/wDjP9lNH/CXu0AKDrDqfonJPgaVtYIfySTdnidfwvaTToV6owb95ocNCAfcLyhhnUDjxt9V6X2KxolwcDxerB51FqFTDroAUoJIRhNI0EEEASCCKqaROXK7eH/+OU8A266lxXLbZ3wk4/wcnA89Tel1HnF7eienNWgpBbcchRJ0PnQfy6YA8RTxNRU8ifslSRUd5tTFS8hJEoK0X8E008IO8LjgfNcBkrfG09QtTw0XgaerfpdYub+T0Pjz8XN47InRf1YqlvTVv3CPC5/IwUcK9Qu2iisR8lQ5vs/G+pb4CeV2n0WTLH7aMevSGdq4gKmo9CqHaDbZ+4RCCOG8eHkE5iNmsRwDCOYd+xVNneROZES8i2jRf3K6cevKbRy5Z+N05CR5cSSSSbknUlHG2qSQlg2XpPI0DnVPRWEO6Y6HUAn7BVg1UhjjREpwphsVufY3jN7BlhPwPIWGsGoWodiWNPeTx11DXgc6WKD+mzApSbYf50TgKEjCNEgSgAiKebhzxTrYgE0ondEqj2my8fhpQXatPlp9F1D1TZ8f6Lv5wNktm8vPi0HIn1odUxO+9FPxbd1zm8auJ6eImiqnu8SNuiQToP8AX6qdMKmvL+UCrA7xev0U4zDuzzJVQlzlOHqW2096rTMpeHNaOS4rZLD71SRQNaCOpdofKi7HJBuuLT0WLlvb0uGfitXJvuCddE4fiIUtjLLhrbrvSuxMQA6C64rawf03GlToB1JXdZg0AFcjn8VWtJ/W008nApYz8jy7xZltBhBHM9rfhaQPI0rRVwXX5xlof+NncfE19AOAdQF3yIAXI0XpT08nKdkFOsKbk1S2IREiPX0XV9mGY9zmMVdJKxn1FQfcfNclBwHX6qVl2I7qVknFj2mvRrh+yFPVEBFE8FEwTt5ocKXvbqKqwEPVG0aNoJ10Fk0EwsCiKOqIlIEOCo84dVpb5/8ACvHFc3n5s53AA1HNTTkecM2FJJv93/UqpjFx7q52otNK0frKqW8TyFFdqiGu/dO79gPkmmiyM2S2GwbP4YHKIcVE0uewls4HxFm/QmnHdsaciVaYR4cQ8WI46VHVMdhmJZLg8Rhn0O481bxMcraE+hBVhhcCY3OhkPjjO7XTfb+Vw5GlFk5p23/Gz3LKmkjfBtcKW6QKK6Gw6aFLiBK4S1oslNYrxKkx2Ac7jYX0/SKj50XSSsUaepe1o1P3CvCfkjky1jXDbQYZoEsIA/qR4eSgF/C6knrcVWYzso9zeRI9its22wIiMcpu3vmh3PdlIaRXkHUNFjOaw7k0jTqHOB894/8AC3R5uSE9GxBwQYmj7PMs4V538k7imEOcKUr9DoikIItqPonsyFXBw4saT9EG9I7C4rvcDhpB+aJtfNo3T9F1TNFwPZEScsgH6S/2LifTVd1G7XopKnXFRH6p3fumXBOFUsPRteo5aWoi7iEEdeVS7QENie7lf0Fz8ldVqKrhe1rMjDgSG/HK7uhz8Q8RHkEjYDmGI7yV8n6nucPUkj5KO5tGjrf3UyLC8OAoExin1NRp/KJ7UYjCKQKW2LToFFkdw5VRLsV1XZhnn4XGd7veHdLXt/WwkbwH+Q+IeRW4bQYQFzJmmzgBUaG1Wn1C8yYZ+64LfOzLPPxmCdhZHAzYcANNbuj1Y6nGnwrjy47268WfjZf+0tInJ4BJZFYIwzmssehsUnFRsK2slf07t/NwUp0dk5lkPglPUfJdOKfk5c2X4U/tPk4xOHlhIu4HcPJ1PD5XovOGduc8944Uef7gpcPb4XfQFep9RVYZ2kZCYcc54o2LEkkcA2QjxDoDrXzWyPPZtVKbGap9uFLXEOoKEj2T+JkA0IryF0WiRGYaGvVKdISKcKUCZNzdTcsa100bHXBc2oHKt7+SY9vRHZlhtzAwjhuj3pqum3ifMpGWQNjiaGU3d0bo4UItRSIWKYKVHHQElIksAPVPvIFz7KK8k3TiU4qNJFRGyfmje72QCMObELMe1rFh2IhgFxDHJO/o5w3I6+m8VpcJ8dOY/dY/tO0yszfFGt5WxRf6s3WgBKnGazS0AHv5lRt2pA905i23HWiWxvi8/unZoQ/FC4lrWtqSdOnL1Qz7JzBKG0s5ocOldW+hV/sAxrswjY/9L6Dm4aeq6XbPKzIZ5mAFsRHlS2+R5EqcbpWUZK+Egrrez3NX4bGQyjSoY8c2PNKHyK56dx3q/wCVuVap/DvJcd21Lj3B+qec6LD29IY6Ib9R8Lrt/cJgjmqvZLP24tj4vzxNa/zBFHD3Cugyv2WOzVbsMutGC3op+zoa+EuaahznCo408JouA212kox8GHde4klB05sYefAlaDsbhRHgMMzlE353Xfjx124c2e5pOjZ4R8+hFlm/a/B3mF7xrC7uXtdvDgCaWHELSRqW8OP7KJm2Ba+GSI0o5jga8Bumq67cHmHMm1fvHRzWu0pWqiT0pa1E7jpdGi4FWt50BOqhlhcbcB9NUHUcuKm5eN0tfxrbzCRh4OKkPaARyPy5J2pj0nsLmzZ8GxzTYCgrqOh6i66ON1BVYp2RZyWSuw5JAeA6MddHN/dbOy9By181M/SsoUxm9c6JLn71aaDRKe6vhGiD/CKcTr5JoAOa7oUToyPL5JxzAdRQpBDm8ahMIsgLZYzQ0JLT0qLV9Rqs3xUArjoH6d7FJu8S1x3S4D/YXWlY5/hLv03p5GtVx23+RSSD8RhzSRrXAj9bHatPNKw5e2GYthZK+N1iHuaK8CDavmKJt5LXVIoQaH1t9aKbtLR8gla0jeaBI06iRtiT5insq1mJNN13ibpX8wH7qr2PS72ellZi4Xxuo8uADqVpU0Njx1W8x5RE2AwtsxzH7xNyagklx4urcrzrhJnNc2RhJLSCHU0I03gtGx3akx+EkjET2Ylzd29DGCRQvB1p01XLXa76ZpNO0O3aVDXONv8AEkD0UjKwZJt1gvJutpStN4jSnFVzcO+hApU2rx9OVVdbM4KXv2Mhk/quNiy+51rwK6ZWaLGWtS7Lct3cwxrheOJohr+p35h6XTG2Oa4nCySYIv8AAfFHNfvDC7Rm9xpcV14Lvdl8nZhYmxMHV51LnG5c48SSqntSyD8RhhMwVkw9XWuXRH4x5j4h5Fc/GXunc7L0xkucQSdLhraWAPE9V6QymPdgibyjYP8AtC87xCrmg3q5oB1rUjivR8LaADkAPkFX2m+iJG601qoebAGN7edj5E0Knu1ULNp2Mic55AABJ9AnSeadpMvEeMxEbRZj306Nt9K0VVunfIpQgUporDGYwPmfM6tHPL6E33QagE+yeGXSd26ctsHNMjjwdL/bjvqd0ElL6dKh7gBa3hS31UN16tPCqlucXOLhYAE9KHQKK8ceqImp2Q4x0c0MgNCyVh3r6bwC9UMFbCwN/e9F5NkZ4LVrRv8A9q1svVmFl3mNpqWivsKo+xfR9zg2w1TccZJqno4gixElBQapoDecNRVGHjh7JaS5o4j2TIxO2x4FQXzHcHhrb6WU97PUKkxUGIIIjkay5APdhxpwIqUQ2X9pWz5YfxDQ0Ag77CQLcDXieizI7pvcV4ra887OsTiZBI7Gl7hTdErN5g6BrSBRVGJ7IsS9znyYxpcePdmg876dAjUVKy0MLdHe1koyE11J/nFX2J2EzGOQx9wTxD2kFjhzB68jdSsL2eZm4gdxu/5F7APumbmO7dqSAFs3ZPsoYI/xMrKSP+AEULW86cyp+yPZ1Bhd2WSk044uuxp47jTx6ruomKLNnvULgjUseVeh0PMJtjU4E3NhWa7PnC5ozDD+06aN8P8A8T3VA/6SC30C3Mm5XPbZZMJfw+Ka0GTCyCQVcGB0ZtI0uOgFnf8ASudzvtMw0NQ2aF79Q2DexB9ZLRj5pb7V7jvJ5ABU2pcngsd7T9vI3B2FwxB4SSjlxaz7qFiMZmma2bvxxHVznbkYHWl3Ho2qg7T9nD8JhRO3elc01ksLN6R6058Ut7XJpQbNZPJiZW0jLm1tW0duL3chyV9trmsLY24HDu32scXzSD88xFCfICw5Bc1LtNiHR91vFjDQEMG7UDQVGg6KubNoKhvnU19tUWHs491B1dQAdOCQSDRo4angluYXXAdQ/ncKEjoOAU7JcklxDxHE2g/M86Dz69ETotLDZHJn4nERNb8LXtL3dAan5W9V6QwjQGgLk9kNnWYWJgoN4CrnUoXHy5LqoSffRObqcv0kSS08013fEp1jKaoPKaTgKBTDKttwT9U0m3BRWto5w50PuFMKjTCjgedv3CDEAjcyqCNAIEQSu6CUwJQcEtmIRpTRQ14JbXJaZAgki1vZKSAHrccRzHELPMP2bYSOeSRrAWl28xhHgYDegbxoea0Iph4ulZKrG6RMJg2soANP5bkjzDCNkYWu0IpY0IryKmJDwnJoMfzvsmk3i7DSsIJ0eKHyNLFc+7s9x7DTu4/MFb80JMoSpzJjeTdmk8hrPJQfpaCK9CTw8lpOR7Ow4doaxoqONNPIK5jHP3TkgoiC5UwxtXeX1UqLVM4b4anU3+yeY1UmnSUTxZLom5zZIi6VSRZGgqIZUfENqD7+yCCk4S11RVOAIIJgnmkkIIKM14lg2ShIggqiaMuS431txH8BQQQCimpAgggEMNUbkEEGSEZZVEggiWMukYxyCCU6OnmNsnIxdBBUk4U1KEEEg//Z",
        expertise: ["Medical Aesthetics", "Skin Rejuvenation", "Facial Electrical Treatments", "Collagen Stimulation"],
        intro: "Diana Seo is the founder of Collagen Bar, a premier medical aesthetic and skincare clinic with locations in Westchester and NYC. With over 15 years of experience in health, medical, and beauty fields, she specializes in advanced skincare solutions.",
        education: [
          "B.S. in Biophysics, Minor in Chemistry & Mathematics, University of Connecticut",
          "Licensed Esthetician, Atelier Esthétique Institute of Esthetics"
        ],
        languages: ["English", "Korean"],
        location: "New York, NY",
        website: "https://collagenbar.com/",
        treatments: [
          {
            name: "Morpheus8 RF Microneedling",
            description: "A fractional radiofrequency (RF) microneedling treatment that stimulates collagen production, remodels skin, and contours the face and body by penetrating up to 4mm deep for superior skin tightening and fat reduction.",
            time: "30–60 minutes",
            price: "$1,150.00"
          }
        ]
      }
    ]
  };

  const doctors = treatment?.name?.toLowerCase() === 'botox' ? doctorsByTreatment.botox :
                 treatment?.name?.toLowerCase() === 'filler' ? doctorsByTreatment.filler :
                 treatment?.name?.toLowerCase() === 'microneedling' ? doctorsByTreatment.microneedling :
                 doctorsByTreatment.botox;

  const handleDoctorClick = (doctor) => {
    Analytics.track('doctor_profile_click', {
      doctor_id: doctor.id,
      doctor_name: doctor.name,
      doctor_title: doctor.title,
      doctor_clinic: doctor.clinic,
      doctor_expertise: doctor.expertise,
      doctor_rating: doctor.rating,
      doctor_reviews: doctor.reviews,
      doctor_location: doctor.location,
      doctor_languages: doctor.languages,
      doctor_education: doctor.education,
      treatment_context: treatment?.name || 'general',
      section: 'doctor_recommendation'
    });

    if (onDoctorClick) {
      onDoctorClick(doctor);
    }
  };

  const handleLocationClick = (doctor) => {
    Analytics.track('location_click', {
      doctor_id: doctor.id,
      doctor_name: doctor.name,
      doctor_location: doctor.location,
      treatment_context: treatment?.name || 'general',
      section: 'doctor_recommendation'
    });

    // Google 지도 URL 생성
    const encodedAddress = encodeURIComponent(doctor.location);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white pt-16 pb-20">
      <div className="p-4 space-y-6">
        <div className="">
          <h2 className="text-xl font-semibold mb-2">Top {treatment?.name} Specialists</h2>
          <p className="text-luxe-600 text-sm">Discover the best specialists for {treatment?.name.toLowerCase()}</p>
      </div>

        <div className="space-y-4 divide-y divide-gray-400">
          {doctors.map((doctor) => (
        <motion.div
              key={doctor.id}
              className="bg-white p-4 first:pt-0 hover:cursor-pointer relative"
              onClick={() => handleDoctorClick(doctor)}
            >
              <div className="flex items-start gap-4">
                <img src={doctor.image} alt={doctor.name} className="w-20 h-20 rounded-full object-cover" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-luxe-900">{doctor.name}</h3>
                  <p className="text-sm text-luxe-600">{doctor.title}</p>
                  <p className="text-xs text-luxe-500">{doctor.clinic}</p>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm">{doctor.rating}</span>
                    <a href={doctor.reviews} target="_blank" rel="noopener noreferrer" className="text-luxe-500 ml-1 text-sm underline">Reviews</a>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {doctor.expertise.map((exp, i) => (
                      <span key={i} className="text-xs bg-luxe-50 text-luxe-600 px-2 py-1 rounded-full">
                        {exp}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center mt-2 text-xs text-luxe-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLocationClick(doctor);
                      }}
                      className="cursor-pointer hover:text-luxe-800 hover:underline"
                    >
                      {doctor.location}
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-luxe-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorRecommendation; 