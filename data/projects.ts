import type { Project } from "./types"

// Fonte única do conteúdo dos projetos (PT e EN). Prints: public/images/tela-*.png.
// Projetos sem print (image: null) usam o placeholder de wireframe.
export const projects: Project[] = [
  {
    "slug": "agenda-barbearia",
    "name": "Agenda Barbearia",
    "hue": 24,
    "year": "2026",
    "origin": "freela",
    "platforms": [
      "web",
      "mobile"
    ],
    "stack": [
      "Flutter",
      "Firebase",
      "Next.js",
      "Supabase"
    ],
    "image": null,
    "subtitle": {
      "pt": "SaaS de agendamento para barbearias",
      "en": "Booking SaaS for barbershops"
    },
    "status": {
      "pt": "Em piloto real",
      "en": "In real pilot"
    },
    "summary": {
      "pt": "Agendamento multi-tenant com painel para o barbeiro e página pública para o cliente marcar sem criar conta. Em piloto com uma barbearia de 3 cadeiras.",
      "en": "Multi-tenant booking with a panel for the barber and a public page for clients to book without an account. In pilot with a 3-chair barbershop."
    },
    "context": {
      "pt": [
        "Dois lados no mesmo produto: o barbeiro ou salão administra a agenda e recebe um link único; o cliente final abre esse link, escolhe e marca sem precisar de conta. O produto precisa garantir duas coisas que não podem falhar: um tenant nunca enxerga os dados de outro e dois clientes nunca ocupam o mesmo horário.",
        "O mercado já tem alternativas gratuitas maduras para esse nicho, então a aposta não foi em diferenciação por funcionalidade: foi começar com uma barbearia real de 3 cadeiras como piloto, que pode indicar o produto a outras."
      ],
      "en": [
        "Two sides in one product: the barber or salon manages the schedule and gets a unique link; the end client opens it, picks and books without needing an account. The product has to guarantee two things that cannot fail: a tenant never sees another tenant's data, and two clients never take the same slot.",
        "The market already has mature free alternatives for this niche, so the bet was not feature differentiation: it was starting with a real 3-chair barbershop as a pilot, which can refer the product to others."
      ]
    },
    "features": {
      "pt": [
        "Onboarding do negócio e gestão de agenda, profissionais, serviços e horário de funcionamento.",
        "Link público compartilhável (WhatsApp, copiar ou QR code) com agendamento em passos: profissional ou qualquer disponível, serviço, data e hora.",
        "Link de cancelamento único para o cliente, sem conta.",
        "Acesso próprio para o profissional, por convite, com painel restrito e tela de ganhos.",
        "Financeiro com comissão por profissional e lojinha com estoque simples.",
        "Notificação de novo agendamento por e-mail; na primeira versão, por WhatsApp Business Cloud API."
      ],
      "en": [
        "Business onboarding and management of schedule, staff, services and opening hours.",
        "Shareable public link (WhatsApp, copy or QR code) with step-by-step booking: professional or any available, service, date and time.",
        "Unique cancellation link for the client, no account needed.",
        "Own access for the professional, by invitation, with a restricted panel and an earnings screen.",
        "Finance with per-professional commission and a small shop with simple inventory.",
        "New-booking notification by email; in the first version, via WhatsApp Business Cloud API."
      ]
    },
    "decisions": {
      "pt": [
        {
          "title": "Garantias no banco, na v1",
          "body": "Na primeira versão (Next.js + Supabase), isolamento entre tenants com RLS default-deny e uma exclusion constraint do Postgres contra agendamento duplicado, imune a condição de corrida. O papel anônimo só executava 4 funções escopadas por slug."
        },
        {
          "title": "Notificação por outbox",
          "body": "As reservas só gravam numa tabela de notificações; uma Edge Function assíncrona entrega, com retry. Uma falha de envio nunca derruba um agendamento já confirmado."
        },
        {
          "title": "Reescrita para Flutter + Firebase",
          "body": "Decisão de reescrever o produto em Flutter + Firebase sem nada pago no núcleo, com a página pública rodando em Flutter Web (link direto, sem instalar app) e versão Android."
        },
        {
          "title": "Anti-double-booking sem constraint de banco",
          "body": "Grade de 15 minutos com locks por célula e transações do Firestore, no lugar do Postgres. Regras de segurança recalculam a duração a partir do serviço real e rejeitam horário fora da grade ou já ocupado, como segunda camada."
        }
      ],
      "en": [
        {
          "title": "Guarantees in the database, in v1",
          "body": "In the first version (Next.js + Supabase), tenant isolation with default-deny RLS and a Postgres exclusion constraint against double-booking, immune to race conditions. The anonymous role could only run 4 slug-scoped functions."
        },
        {
          "title": "Outbox notifications",
          "body": "Bookings only write to a notifications table; an async Edge Function delivers them, with retry. A delivery failure never breaks an already confirmed booking."
        },
        {
          "title": "Rewrite to Flutter + Firebase",
          "body": "Decision to rewrite the product in Flutter + Firebase with nothing paid at its core, with the public page running on Flutter Web (direct link, no app install) and an Android version."
        },
        {
          "title": "Anti-double-booking without a database constraint",
          "body": "15-minute grid with per-cell locks and Firestore transactions, replacing Postgres. Security rules recompute duration from the real service and reject off-grid or taken slots, as a second layer."
        }
      ]
    },
    "architecture": {
      "pt": "Hoje: Flutter (Web e Android) com Firebase (Auth, Firestore). Modelo com tenants, slugs reservados, e subcoleções de profissionais, serviços e horários; agendamentos têm o próprio token de cancelamento como identificador. A primeira versão ficou em Next.js (App Router), TypeScript, Tailwind e Supabase.",
      "en": "Today: Flutter (Web and Android) with Firebase (Auth, Firestore). Model with tenants, reserved slugs, and subcollections for staff, services and hours; bookings use their own cancellation token as identifier. The first version was built with Next.js (App Router), TypeScript, Tailwind and Supabase."
    },
    "challenges": {
      "pt": [
        "Provar, sem constraint de banco, que dois horários que se sobrepõem sempre compartilham uma célula da grade. A prova está coberta por testes unitários, e as regras de segurança têm testes automatizados contra o emulador do Firestore.",
        "Uma rodada de teste manual em produção achou bugs reais, como cancelamento por cliente logado e listas vazias por falta de um índice de collection group. Todos corrigidos.",
        "Endurecimento depois do piloto: comissão congelada no momento do agendamento, convite de profissional que expira em 7 dias, validação de horário no passado também no servidor, e erros de rede que não são mais tratados como lista vazia."
      ],
      "en": [
        "Proving, without a database constraint, that two overlapping slots always share a grid cell. The proof is covered by unit tests, and the security rules have automated tests against the Firestore emulator.",
        "A manual test round in production found real bugs, such as cancellation by a logged-in client and empty lists caused by a missing collection-group index. All fixed.",
        "Hardening after the pilot: commission frozen at booking time, professional invites that expire in 7 days, past-time validation also on the server, and network errors no longer treated as an empty list."
      ]
    },
    "role": {
      "pt": "Desenvolvimento full-stack, em parceria com dois amigos.",
      "en": "Full-stack development, in partnership with two friends."
    },
    "techs": [
      {
        "name": "Flutter",
        "desc": {
          "pt": "App Web e Android",
          "en": "Web and Android app"
        }
      },
      {
        "name": "Firebase",
        "desc": {
          "pt": "Auth, Firestore e Security Rules",
          "en": "Auth, Firestore and Security Rules"
        }
      },
      {
        "name": "Next.js + Supabase",
        "desc": {
          "pt": "Primeira versão, com RLS multi-tenant e constraint de exclusão",
          "en": "First version, with multi-tenant RLS and an exclusion constraint"
        }
      },
      {
        "name": "WhatsApp Business Cloud API",
        "desc": {
          "pt": "Notificações na primeira versão",
          "en": "Notifications in the first version"
        }
      }
    ],
    "links": []
  },
  {
    "slug": "plantei",
    "name": "Plantei",
    "hue": 140,
    "year": "2026",
    "origin": "acad",
    "platforms": [
      "web"
    ],
    "stack": [
      "React",
      "Spring Boot",
      "MySQL",
      "MSAL"
    ],
    "image": "plantei",
    "subtitle": {
      "pt": "App educacional para horta escolar",
      "en": "Educational app for a school garden"
    },
    "summary": {
      "pt": "Aplicação web para professores e turmas do maternal acompanharem o crescimento das plantas da horta, com animações, sons e o personagem Benny, o Minhoco.",
      "en": "Web app for teachers and preschool classes to follow the growth of the school garden plants, with animations, sounds and the character Benny the Worm."
    },
    "context": {
      "pt": [
        "Projeto acadêmico do curso de Engenharia de Software da PUC Minas, feito em equipe de 7 pessoas. A ideia é aproximar crianças da educação infantil do contato com a natureza de um jeito tecnológico e pedagógico.",
        "O desafio de produto é criar uma experiência acessível e segura para crianças de 2 a 5 anos e, ao mesmo tempo, uma ferramenta simples de registro para o professor."
      ],
      "en": [
        "Academic project from the Software Engineering course at PUC Minas, built by a 7-person team. The idea is to bring preschool children closer to nature in a technological and pedagogical way.",
        "The product challenge is to create an accessible, safe experience for children aged 2 to 5 and, at the same time, a simple record-keeping tool for the teacher."
      ]
    },
    "features": {
      "pt": [
        "Dashboard do jardim, com as plantas da turma e seus estágios de crescimento.",
        "Perfil da planta: nome, data de plantio, estágio, fotos e curiosidades didáticas.",
        "Linha do tempo de cada planta, da semente à colheita.",
        "Celebrações com confete e sons ao atingir um novo estágio.",
        "Modo criança, guiado pelo personagem Benny, o Minhoco, com interações como regar a planta e quizzes animados.",
        "Visão geral do progresso da turma."
      ],
      "en": [
        "Garden dashboard with the class plants and their growth stages.",
        "Plant profile: name, planting date, stage, photos and educational facts.",
        "Timeline for each plant, from seed to harvest.",
        "Celebrations with confetti and sounds when reaching a new stage.",
        "Kids mode, guided by the character Benny the Worm, with interactions like watering the plant and animated quizzes.",
        "Overview of the class progress."
      ]
    },
    "decisions": {
      "pt": [
        {
          "title": "Login institucional",
          "body": "Autenticação com conta Microsoft via MSAL no front-end, validada no back-end com Spring Security, JWT e OAuth2 Resource Server."
        },
        {
          "title": "Back-end em camadas",
          "body": "Java 21 com Spring Boot 4, Spring Data JPA e MapStruct para o mapeamento entre entidades e DTOs."
        },
        {
          "title": "Imagens fora do banco",
          "body": "Fotos das plantas hospedadas no Cloudinary; banco MySQL 8 sobe localmente com Docker Compose."
        }
      ],
      "en": [
        {
          "title": "Institutional login",
          "body": "Microsoft account authentication via MSAL on the front-end, validated on the back-end with Spring Security, JWT and OAuth2 Resource Server."
        },
        {
          "title": "Layered back-end",
          "body": "Java 21 with Spring Boot 4, Spring Data JPA and MapStruct for mapping between entities and DTOs."
        },
        {
          "title": "Images outside the database",
          "body": "Plant photos hosted on Cloudinary; the MySQL 8 database runs locally with Docker Compose."
        }
      ]
    },
    "architecture": {
      "pt": "Front-end em React 19 com React Router, Tailwind CSS 4 e Vite 7. Back-end Java 21 + Spring Boot 4 com MySQL 8. Hospedagem no servidor institucional da PUC Minas, e demonstração online na Vercel.",
      "en": "React 19 front-end with React Router, Tailwind CSS 4 and Vite 7. Java 21 + Spring Boot 4 back-end with MySQL 8. Hosted on the PUC Minas institutional server, with an online demo on Vercel."
    },
    "challenges": {
      "pt": [
        "Trabalhar em 7 pessoas num mesmo produto, com front e back separados e um fluxo de autenticação institucional.",
        "Desenhar uma interface para crianças pequenas, em que animação, som e simplicidade importam mais que densidade de informação."
      ],
      "en": [
        "Working in 7 people on the same product, with separate front and back ends and an institutional authentication flow.",
        "Designing an interface for small children, where animation, sound and simplicity matter more than information density."
      ]
    },
    "role": {
      "pt": "Integrante de uma equipe de 7 pessoas.",
      "en": "Member of a 7-person team."
    },
    "techs": [
      {
        "name": "React 19 + Vite",
        "desc": {
          "pt": "Front-end e animações",
          "en": "Front-end and animations"
        }
      },
      {
        "name": "Tailwind CSS 4",
        "desc": {
          "pt": "Estilização",
          "en": "Styling"
        }
      },
      {
        "name": "MSAL",
        "desc": {
          "pt": "Login Microsoft",
          "en": "Microsoft login"
        }
      },
      {
        "name": "Java 21 + Spring Boot 4",
        "desc": {
          "pt": "Back-end, JPA, Spring Security e JWT",
          "en": "Back-end, JPA, Spring Security and JWT"
        }
      },
      {
        "name": "MySQL 8",
        "desc": {
          "pt": "Banco relacional",
          "en": "Relational database"
        }
      },
      {
        "name": "Cloudinary",
        "desc": {
          "pt": "Hospedagem de imagens",
          "en": "Image hosting"
        }
      }
    ],
    "links": [
      {
        "kind": "live",
        "url": "https://planteicspc.vercel.app/"
      },
      {
        "kind": "code",
        "url": "https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-1-ti4-3170100-plantei"
      }
    ]
  },
  {
    "slug": "plane-graph",
    "name": "Plane Graph Analysis",
    "hue": 262,
    "year": "2026",
    "origin": "acad",
    "platforms": [
      "web"
    ],
    "stack": [
      "Python",
      "FastAPI",
      "React",
      "Sigma.js"
    ],
    "image": null,
    "subtitle": {
      "pt": "Análise de rede de colaboração open-source",
      "en": "Open-source collaboration network analysis"
    },
    "summary": {
      "pt": "Quem colabora com quem no repositório makeplane/plane, modelado como grafos direcionados e ponderados implementados do zero, sem NetworkX, com dashboard interativo.",
      "en": "Who collaborates with whom in the makeplane/plane repository, modeled as directed, weighted graphs implemented from scratch, without NetworkX, with an interactive dashboard."
    },
    "context": {
      "pt": [
        "Trabalho da disciplina de Teoria de Grafos e Computabilidade. O objetivo é entender a rede social de colaboração do repositório open-source Plane a partir das interações em issues e pull requests: comentários, fechamentos, revisões e merges.",
        "A restrição que define o projeto é que a estrutura de grafo e todos os algoritmos são implementados à mão, sem bibliotecas prontas como NetworkX."
      ],
      "en": [
        "Project for the Graph Theory and Computability course. The goal is to understand the collaboration network of the open-source Plane repository from the interactions in issues and pull requests: comments, closings, reviews and merges.",
        "The constraint that defines the project is that the graph structure and all the algorithms are implemented by hand, without ready-made libraries like NetworkX."
      ]
    },
    "features": {
      "pt": [
        "Quatro grafos direcionados e ponderados: comentários (peso 2), fechamentos (3), reviews e merges (4 e 5) e um grafo integrado que acumula os pesos.",
        "Resultado sobre dados reais do repositório: 1.496 nós e 2.313 arestas, a partir de 1.219 issues e 4.347 PRs.",
        "Centralidades: grau, PageRank, Betweenness (algoritmo de Brandes) e Closeness.",
        "Detecção de comunidades por Label Propagation e métricas globais como densidade, reciprocidade, clustering e componentes fortemente conexos.",
        "Exportação para Gephi (GEXF), JSON para web e CSV de métricas.",
        "Dashboard em React com Sigma.js: nós coloridos por comunidade, tamanho proporcional ao PageRank, zoom, pan e download do GEXF."
      ],
      "en": [
        "Four directed, weighted graphs: comments (weight 2), closings (3), reviews and merges (4 and 5) and an integrated graph that accumulates the weights.",
        "Result on the repository's real data: 1,496 nodes and 2,313 edges, from 1,219 issues and 4,347 PRs.",
        "Centralities: degree, PageRank, Betweenness (Brandes' algorithm) and Closeness.",
        "Community detection via Label Propagation and global metrics such as density, reciprocity, clustering and strongly connected components.",
        "Export to Gephi (GEXF), JSON for the web and a metrics CSV.",
        "React dashboard with Sigma.js: nodes colored by community, size proportional to PageRank, zoom, pan and GEXF download."
      ]
    },
    "decisions": {
      "pt": [
        {
          "title": "API de grafo abstrata",
          "body": "Uma interface com implementações em lista de adjacência e em matriz de adjacência, testadas com os mesmos casos parametrizados."
        },
        {
          "title": "Pipeline em etapas",
          "body": "Mineração via API do GitHub com cache local em JSON, construção dos grafos, análise, exportação e API. Um modo offline com dados simulados permite demonstrar sem token."
        },
        {
          "title": "Filtro de bots",
          "body": "Bots como dependabot saem do grafo por padrão, com opção de incluí-los."
        }
      ],
      "en": [
        {
          "title": "Abstract graph API",
          "body": "An interface with adjacency-list and adjacency-matrix implementations, tested with the same parameterized cases."
        },
        {
          "title": "Staged pipeline",
          "body": "Mining via the GitHub API with a local JSON cache, graph building, analysis, export and API. An offline mode with simulated data allows demoing without a token."
        },
        {
          "title": "Bot filter",
          "body": "Bots such as dependabot are removed from the graph by default, with an option to include them."
        }
      ]
    },
    "architecture": {
      "pt": "Back-end em Python (mineração, construção, análise, exportação) exposto por FastAPI, com endpoints por tipo de grafo e de métricas. Front-end em React 18, Sigma.js, Tailwind e Vite. Testes unitários e de integração com pytest.",
      "en": "Python back-end (mining, building, analysis, export) exposed by FastAPI, with endpoints per graph type and metrics. Front-end in React 18, Sigma.js, Tailwind and Vite. Unit and integration tests with pytest."
    },
    "challenges": {
      "pt": [
        "Implementar centralidades e comunidades do zero sem perder a corretude, especialmente em grafos desconexos (Closeness) e com custo O(V·E) (Betweenness).",
        "Manter a mesma API para duas representações de grafo diferentes."
      ],
      "en": [
        "Implementing centralities and communities from scratch without losing correctness, especially on disconnected graphs (Closeness) and at O(V·E) cost (Betweenness).",
        "Keeping the same API for two different graph representations."
      ]
    },
    "role": {
      "pt": "Implementação das classes de grafo, da análise (centralidades e comunidades), da exportação (GEXF, JSON e CSV) e dos testes de integração. O repositório é de um colega da equipe.",
      "en": "Implemented the graph classes, the analysis (centralities and communities), the export (GEXF, JSON and CSV) and the integration tests. The repository belongs to a teammate."
    },
    "techs": [
      {
        "name": "Python",
        "desc": {
          "pt": "Estrutura de grafo própria, sem NetworkX",
          "en": "Custom graph structure, no NetworkX"
        }
      },
      {
        "name": "FastAPI",
        "desc": {
          "pt": "API de back-end",
          "en": "Back-end API"
        }
      },
      {
        "name": "React",
        "desc": {
          "pt": "Front-end de visualização",
          "en": "Visualization front-end"
        }
      },
      {
        "name": "Sigma.js",
        "desc": {
          "pt": "Renderização do grafo",
          "en": "Graph rendering"
        }
      }
    ],
    "links": [
      {
        "kind": "code",
        "url": "https://github.com/bernardocdm/plane-graph-analysis"
      }
    ]
  },
  {
    "slug": "japan-motors",
    "name": "Japan Motors",
    "hue": 200,
    "year": "2025",
    "origin": "acad",
    "platforms": [
      "web"
    ],
    "stack": [
      "Java",
      "Spring Boot",
      "HTML",
      "CSS"
    ],
    "image": null,
    "subtitle": {
      "pt": "Gestão de oficina mecânica",
      "en": "Auto repair shop management"
    },
    "summary": {
      "pt": "Sistema web para gerir veículos, clientes, peças usadas e termos de garantia de uma oficina. Entregue na faculdade e depois empacotado para rodar localmente em uma oficina.",
      "en": "Web system to manage vehicles, clients, used parts and warranty terms of a repair shop. Delivered at university and later packaged to run locally in a shop."
    },
    "context": {
      "pt": [
        "Projeto acadêmico da PUC Minas (Projeto Padrão de TI), feito em equipe de 4 pessoas. A proposta é uma solução web completa para automatizar o gerenciamento de veículos, clientes, peças usadas e termos de garantia, para uma operação mais organizada e um atendimento mais rápido."
      ],
      "en": [
        "PUC Minas academic project (standard IT project), built by a 4-person team. The proposal is a complete web solution to automate the management of vehicles, clients, used parts and warranty terms, for a more organized operation and faster service."
      ]
    },
    "features": {
      "pt": [
        "Cadastro e acompanhamento de veículos e clientes.",
        "Controle de estoque de peças usadas.",
        "Registro e emissão de termos de garantia.",
        "Relatórios."
      ],
      "en": [
        "Registration and tracking of vehicles and clients.",
        "Used-parts inventory control.",
        "Registration and issuing of warranty terms.",
        "Reports."
      ]
    },
    "decisions": {
      "pt": [
        {
          "title": "Empacotamento depois da entrega",
          "body": "Para rodar numa oficina real sem precisar digitar comandos, o banco passou de MySQL para H2 embarcado e o front-end foi movido para os recursos estáticos do Spring Boot, ficando um único processo e uma única porta."
        },
        {
          "title": "Sem instalar Java",
          "body": "O pacote inclui um runtime Java portátil gerado com jlink e scripts .bat que registram uma tarefa agendada ao iniciar o Windows."
        },
        {
          "title": "Java 17",
          "body": "O nível da linguagem foi rebaixado de 21 para 17, porque o projeto não usava nada exclusivo do 21 e isso evitou baixar um JDK novo."
        }
      ],
      "en": [
        {
          "title": "Packaging after delivery",
          "body": "To run in a real shop without typing commands, the database moved from MySQL to embedded H2 and the front-end moved into Spring Boot's static resources, leaving a single process and a single port."
        },
        {
          "title": "No Java install",
          "body": "The package ships a portable Java runtime built with jlink and .bat scripts that register a scheduled task at Windows startup."
        },
        {
          "title": "Java 17",
          "body": "The language level was lowered from 21 to 17, since the project used nothing exclusive to 21 and this avoided downloading a new JDK."
        }
      ]
    },
    "architecture": {
      "pt": "Back-end em Spring Boot 3.5 (Java 17) e front-end em HTML, CSS e JavaScript puro, com várias páginas, servido pelo próprio back-end.",
      "en": "Spring Boot 3.5 (Java 17) back-end and a plain HTML, CSS and JavaScript multi-page front-end, served by the back-end itself."
    },
    "challenges": {
      "pt": [
        "Fazer um projeto acadêmico virar algo instalável por quem não é técnico, sem depender de comandos nem de instalar dependências."
      ],
      "en": [
        "Turning an academic project into something installable by a non-technical person, with no commands and no dependencies to install."
      ]
    },
    "role": {
      "pt": "Integrante da equipe de 4 pessoas e responsável pelo empacotamento depois da entrega.",
      "en": "Member of the 4-person team and responsible for the packaging after delivery."
    },
    "techs": [
      {
        "name": "Java + Spring Boot",
        "desc": {
          "pt": "Lógica da aplicação e API",
          "en": "Application logic and API"
        }
      },
      {
        "name": "HTML5 + CSS3 + JS",
        "desc": {
          "pt": "Telas",
          "en": "Screens"
        }
      },
      {
        "name": "H2",
        "desc": {
          "pt": "Banco embarcado na versão empacotada",
          "en": "Embedded database in the packaged version"
        }
      }
    ],
    "links": [
      {
        "kind": "code",
        "url": "https://github.com/matheushtms/Oficina-Mecanica"
      }
    ]
  },
  {
    "slug": "brecho-online",
    "name": "Brechó Online",
    "hue": 330,
    "year": "2026",
    "origin": "freela",
    "platforms": [
      "web"
    ],
    "stack": [
      "Next.js",
      "Supabase"
    ],
    "image": null,
    "subtitle": {
      "pt": "E-commerce de roupas usadas",
      "en": "Second-hand clothing e-commerce"
    },
    "summary": {
      "pt": "Loja online com catálogo de peças usadas, feita para um cliente real, na mesma stack do Agenda Barbearia.",
      "en": "Online store with a catalog of used pieces, built for a real client, on the same stack as Agenda Barbearia."
    },
    "context": {
      "pt": [
        "Loja online de brechó com catálogo de peças usadas, desenvolvida para um cliente real, como projeto freelancer em parceria com dois amigos."
      ],
      "en": [
        "Online second-hand clothing store with a catalog of used pieces, built for a real client, as a freelance project in partnership with two friends."
      ]
    },
    "features": {
      "pt": [
        "Catálogo de peças usadas."
      ],
      "en": [
        "Catalog of used pieces."
      ]
    },
    "decisions": {
      "pt": [
        {
          "title": "Mesma stack do Agenda Barbearia",
          "body": "Reaproveitou o conhecimento de Next.js e Supabase de outro projeto."
        }
      ],
      "en": [
        {
          "title": "Same stack as Agenda Barbearia",
          "body": "Reused the Next.js and Supabase knowledge from another project."
        }
      ]
    },
    "architecture": {
      "pt": "Next.js no front-end e no back-end, com Supabase para banco de dados e autenticação.",
      "en": "Next.js on front-end and back-end, with Supabase for database and authentication."
    },
    "role": {
      "pt": "Desenvolvimento full-stack, em parceria com dois amigos.",
      "en": "Full-stack development, in partnership with two friends."
    },
    "techs": [
      {
        "name": "Next.js",
        "desc": {
          "pt": "Front-end e back-end",
          "en": "Front-end and back-end"
        }
      },
      {
        "name": "Supabase",
        "desc": {
          "pt": "Banco de dados e autenticação",
          "en": "Database and authentication"
        }
      }
    ],
    "links": []
  },
  {
    "slug": "box-plus",
    "name": "Box+",
    "hue": 18,
    "year": "2026",
    "origin": "freela",
    "platforms": [
      "web",
      "mobile"
    ],
    "stack": [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Flutter"
    ],
    "image": null,
    "subtitle": {
      "pt": "Gestão de oficina mecânica",
      "en": "Auto repair shop management"
    },
    "status": {
      "pt": "No ar",
      "en": "Live"
    },
    "summary": {
      "pt": "Sistema sob medida para uma oficina: agenda, quadro de etapas do carro, estoque, faturamento e portal do cliente, com painel web e dois apps Flutter.",
      "en": "Custom system for a repair shop: scheduling, car-stage board, inventory, billing and a customer portal, with a web panel and two Flutter apps."
    },
    "context": {
      "pt": [
        "Sistema de gestão feito sob medida para uma oficina mecânica específica, não como produto multi-tenant. Tem três perfis: o gestor, que usa o painel web; a equipe da oficina, que usa um app para ver a agenda do dia e avançar a etapa do carro em um toque; e o cliente, que agenda, acompanha o andamento e recebe aviso quando o carro fica pronto.",
        "O escopo do MVP foi cortado antes de começar: agenda, quadro de etapas, histórico com peças usadas, faturamento básico e portal do cliente. Estoque e lembretes de manutenção ficaram para a fase 2, e acabaram implementados depois. Hoje o sistema também serve de vitrine do que dá para entregar nos projetos freelancer."
      ],
      "en": [
        "Management system built to measure for a specific repair shop, not as a multi-tenant product. It has three profiles: the manager, who uses the web panel; the shop team, who use an app to see the day's schedule and advance a car's stage in one tap; and the customer, who books, follows progress and gets notified when the car is ready.",
        "The MVP scope was cut before starting: schedule, stage board, history with parts used, basic billing and the customer portal. Inventory and maintenance reminders were left for phase 2, and ended up implemented later. Today the system also serves as a showcase of what can be delivered in the freelance projects."
      ]
    },
    "features": {
      "pt": [
        "Agendamento de clientes e disponibilidade de horários.",
        "Quadro de etapas do carro: Aguardando, Em serviço, Pronto, Entregue.",
        "Histórico de serviço com as peças usadas.",
        "Estoque de peças com baixa transacional na própria ordem de serviço e botão de reposição.",
        "Lembretes de manutenção preventiva por data, com notificação push.",
        "Faturamento do mês, ticket médio e histórico mensal em gráfico.",
        "Portal do cliente no app, com notificação quando o carro fica pronto.",
        "Exportação e exclusão de dados do usuário, para atender a LGPD."
      ],
      "en": [
        "Client scheduling and time-slot availability.",
        "Car stage board: Waiting, In service, Ready, Delivered.",
        "Service history with the parts used.",
        "Parts inventory with transactional stock deduction in the service order itself and a restock button.",
        "Preventive maintenance reminders by date, with push notification.",
        "Monthly billing, average ticket and monthly history chart.",
        "Customer portal in the app, with a notification when the car is ready.",
        "User data export and deletion, to meet LGPD."
      ]
    },
    "decisions": {
      "pt": [
        {
          "title": "Backend próprio e enxuto",
          "body": "API em Node, TypeScript e Fastify, com Postgres puro e JWT próprio, em vez de um BaaS. Mesmo sendo single-tenant, foi uma escolha consciente."
        },
        {
          "title": "Etapas idempotentes",
          "body": "A máquina de etapas tolera reenvio de eventos (clientEventId), o que resolve a rede instável no chão da oficina."
        },
        {
          "title": "Dois apps Flutter separados",
          "body": "O app da equipe não deveria aparecer em loja pública, então equipe e cliente são apps distintos."
        },
        {
          "title": "UI otimista e fila offline",
          "body": "No app da equipe, o avanço de etapa aparece na hora e entra numa fila de retry se faltar conexão."
        },
        {
          "title": "Permissões por papel e por registro",
          "body": "Cada perfil só enxerga e altera o que é seu."
        },
        {
          "title": "Identidade visual própria",
          "body": "Tema industrial de pit lane: na tela de login, as luzes de largada de F1 refletem o estado real do login."
        }
      ],
      "en": [
        {
          "title": "Lean custom backend",
          "body": "API in Node, TypeScript and Fastify, with plain Postgres and custom JWT, instead of a BaaS. Even though it is single-tenant, it was a conscious choice."
        },
        {
          "title": "Idempotent stages",
          "body": "The stage machine tolerates event resubmission (clientEventId), which handles the unstable network on the shop floor."
        },
        {
          "title": "Two separate Flutter apps",
          "body": "The team app should not show up in a public store, so team and customer are distinct apps."
        },
        {
          "title": "Optimistic UI and offline queue",
          "body": "In the team app, a stage change shows up instantly and goes into a retry queue if the connection drops."
        },
        {
          "title": "Permissions by role and by record",
          "body": "Each profile only sees and changes what is theirs."
        },
        {
          "title": "Own visual identity",
          "body": "Industrial pit-lane theme: on the login screen, F1 start lights reflect the real login state."
        }
      ]
    },
    "architecture": {
      "pt": "Monorepo com api (Node, TypeScript, Fastify, PostgreSQL), web (Next.js, painel do gestor), mobile-equipe e mobile-cliente (Flutter). Hospedagem da API e do painel no Render e banco no Neon. Os testes automatizados somam algumas centenas, com 178 só na API.",
      "en": "Monorepo with api (Node, TypeScript, Fastify, PostgreSQL), web (Next.js, manager panel), mobile-equipe and mobile-cliente (Flutter). API and panel hosted on Render and the database on Neon. Automated tests add up to a few hundred, with 178 in the API alone."
    },
    "challenges": {
      "pt": [
        "Os apps móveis encontraram uma lacuna real: um cliente novo, sem atendimento prévio, não conseguia se auto-agendar porque a API não permitia cadastrar o próprio veículo. Foi fechada com endpoints próprios, com limite de veículos por conta contra abuso.",
        "Dois deploys falharam por causa de dependências de desenvolvimento ignoradas em produção e de um conflito de peer dependency que só aparece em instalação limpa. Ambos documentados e corrigidos.",
        "Um teste do app da equipe encontrou um bug de ciclo de vida que só apareceria no logout."
      ],
      "en": [
        "The mobile apps found a real gap: a new customer, with no prior service, could not self-book because the API did not let them register their own vehicle. It was closed with dedicated endpoints, with a per-account vehicle limit against abuse.",
        "Two deploys failed because of dev dependencies skipped in production and a peer-dependency conflict that only shows up in a clean install. Both documented and fixed.",
        "A test in the team app caught a lifecycle bug that would only have shown up on logout."
      ]
    },
    "role": {
      "pt": "Desenvolvimento full-stack e mobile, em parceria com dois amigos.",
      "en": "Full-stack and mobile development, in partnership with two friends."
    },
    "techs": [
      {
        "name": "Node.js + Fastify",
        "desc": {
          "pt": "API em TypeScript",
          "en": "TypeScript API"
        }
      },
      {
        "name": "PostgreSQL",
        "desc": {
          "pt": "Banco de dados (Neon)",
          "en": "Database (Neon)"
        }
      },
      {
        "name": "Next.js",
        "desc": {
          "pt": "Painel web do gestor",
          "en": "Manager web panel"
        }
      },
      {
        "name": "Flutter",
        "desc": {
          "pt": "Apps da equipe e do cliente",
          "en": "Team and customer apps"
        }
      }
    ],
    "links": []
  },
  {
    "slug": "cafe-labs-admin",
    "name": "Café Labs Admin",
    "hue": 36,
    "year": "2026",
    "origin": "freela",
    "platforms": [
      "web"
    ],
    "stack": [
      "React",
      "TypeScript",
      "Firebase"
    ],
    "image": null,
    "subtitle": {
      "pt": "Hub de gestão interna",
      "en": "Internal management hub"
    },
    "status": {
      "pt": "Em produção",
      "en": "In production"
    },
    "summary": {
      "pt": "Hub interno de clientes e financeiro dos projetos freelancer do grupo, com funil de prospecção, LGPD e exportação de leads em PDF.",
      "en": "Internal hub for clients and finances of the group's freelance projects, with a prospecting funnel, LGPD handling and lead PDF export."
    },
    "context": {
      "pt": [
        "Ferramenta interna usada no dia a dia dos projetos freelancer do grupo. Nasceu como um CRM de prospecção e foi reestruturada como um hub de administração, com clientes e financeiro no mesmo lugar."
      ],
      "en": [
        "Internal tool used day to day across the group's freelance projects. It started as a prospecting CRM and was restructured as an administration hub, with clients and finances in one place."
      ]
    },
    "features": {
      "pt": [
        "Funil de prospecção: novo, tentando contato, reunião agendada, reunião realizada, cliente fechado ou não fechou.",
        "LGPD como peça central: lista de não contatar, exportação e exclusão dos dados de um titular.",
        "Importação de leads em lote, com deduplicação.",
        "Projetos de clientes depois da venda, com histórico de etapas.",
        "Financeiro com despesas e pagamentos de projetos, com acesso restrito por papel.",
        "Dashboard com funil e conversão, e exportação de leads em PDF."
      ],
      "en": [
        "Prospecting funnel: new, trying contact, meeting scheduled, meeting held, closed client or not closed.",
        "LGPD as a core piece: do-not-contact list, export and deletion of a data subject's data.",
        "Batch lead import, with deduplication.",
        "Client projects after the sale, with stage history.",
        "Finance with expenses and project payments, with role-restricted access.",
        "Dashboard with funnel and conversion, and lead PDF export."
      ]
    },
    "decisions": {
      "pt": [
        {
          "title": "Firebase como backend",
          "body": "Auth (Google e e-mail e senha), Firestore e Security Rules, o mesmo padrão dos outros produtos do grupo, com o esquema modelado para documentos."
        },
        {
          "title": "Sem Cloud Functions",
          "body": "O que seriam triggers do banco virou funções no código do cliente, mantendo a infraestrutura enxuta."
        },
        {
          "title": "Segurança em camadas possíveis",
          "body": "Allowlist de usuários e Security Rules por coleção, definindo quem lê e escreve em cada uma. Um modelo adequado para uma ferramenta interna de 2 a 3 pessoas."
        },
        {
          "title": "Seed idempotente",
          "body": "Como não há migration no servidor, categorias fixas são criadas por um botão de configuração que roda com a sessão do próprio usuário."
        }
      ],
      "en": [
        {
          "title": "Firebase as the backend",
          "body": "Auth (Google and email/password), Firestore and Security Rules, the same standard as the group's other products, with the schema modeled around documents."
        },
        {
          "title": "No Cloud Functions",
          "body": "What would have been database triggers became functions in the client code, keeping the infrastructure lean."
        },
        {
          "title": "Security in the layers available",
          "body": "User allowlist and Security Rules per collection, defining who reads and writes each one. A model that fits an internal tool used by 2 or 3 people."
        },
        {
          "title": "Idempotent seed",
          "body": "Since there is no server-side migration, fixed categories are created by a setup button that runs with the user's own session."
        }
      ]
    },
    "architecture": {
      "pt": "SPA 100% no cliente em React, Vite e TypeScript, com Firebase (Auth com Google e e-mail e senha, Firestore em São Paulo e Security Rules). Agregações do dashboard calculadas em JavaScript sobre as coleções.",
      "en": "100% client-side SPA in React, Vite and TypeScript, with Firebase (Auth with Google and email/password, Firestore in São Paulo and Security Rules). Dashboard aggregations computed in JavaScript over the collections."
    },
    "challenges": {
      "pt": [
        "Modelar o esquema para Firestore sem perder as garantias de negócio que um banco relacional dá, como o histórico de etapas que só recebe inserções.",
        "Cortar do escopo as notificações automáticas, que dependiam de funções agendadas de servidor."
      ],
      "en": [
        "Modeling the schema for Firestore without losing the business guarantees a relational database gives, such as the append-only stage history.",
        "Cutting automatic notifications from scope, which depended on scheduled server functions."
      ]
    },
    "role": {
      "pt": "Desenvolvimento, em parceria com dois amigos.",
      "en": "Development, in partnership with two friends."
    },
    "techs": [
      {
        "name": "React + Vite",
        "desc": {
          "pt": "Interface (SPA)",
          "en": "Interface (SPA)"
        }
      },
      {
        "name": "TypeScript",
        "desc": {
          "pt": "Tipagem do código",
          "en": "Typed code"
        }
      },
      {
        "name": "Firebase",
        "desc": {
          "pt": "Auth, Firestore e Security Rules",
          "en": "Auth, Firestore and Security Rules"
        }
      }
    ],
    "links": []
  },
  {
    "slug": "dindin",
    "name": "Dindin",
    "hue": 28,
    "year": "2026",
    "origin": "freela",
    "platforms": [
      "mobile",
      "web"
    ],
    "stack": [
      "Flutter",
      "Riverpod",
      "Firebase"
    ],
    "image": "dindin",
    "subtitle": {
      "pt": "Finanças por envelopes",
      "en": "Envelope-based personal finance"
    },
    "summary": {
      "pt": "App de finanças pessoais em caixinhas de gasto e de poupança, com limites, metas e transferência entre elas. Flutter em Web, Android e Windows.",
      "en": "Personal finance app built on spending and saving envelopes, with limits, goals and transfers between them. Flutter on Web, Android and Windows."
    },
    "context": {
      "pt": [
        "A receita entra como saldo da conta e só depois é alocada em caixinhas; os gastos saem de uma caixinha ou direto da conta. Cada caixinha tem um propósito: gasto, com limite mensal opcional, ou poupança, com meta opcional.",
        "Uma caixinha de gasto pode permitir saldo negativo, uma dívida que a próxima alocação quita automaticamente."
      ],
      "en": [
        "Income arrives as account balance and is only then allocated to envelopes; expenses come out of an envelope or straight from the account. Each envelope has a purpose: spending, with an optional monthly limit, or saving, with an optional goal.",
        "A spending envelope can allow a negative balance, a debt that the next allocation settles automatically."
      ]
    },
    "features": {
      "pt": [
        "Caixinhas de gasto e de poupança, com limite mensal e meta.",
        "Transferência de dinheiro entre caixinhas.",
        "Dashboard com gráficos.",
        "Interface em português (padrão) e inglês, seguindo o idioma do aparelho ou a escolha nas configurações.",
        "Exportação de todos os dados em JSON e importação de volta, como backup e para migrar entre contas.",
        "Landing page própria, em dindin.cafelabs.net."
      ],
      "en": [
        "Spending and saving envelopes, with monthly limit and goal.",
        "Money transfers between envelopes.",
        "Dashboard with charts.",
        "UI in Portuguese (default) and English, following the device language or the setting.",
        "Export of all data as JSON and import back, as backup and to migrate between accounts.",
        "Its own landing page, at dindin.cafelabs.net."
      ]
    },
    "decisions": {
      "pt": [
        {
          "title": "Integridade do dinheiro",
          "body": "Saldos desnormalizados protegidos por Security Rules do Firestore, com um modelo de integridade documentado. A matemática de dinheiro fica em funções puras de agregação, com testes."
        },
        {
          "title": "Deploy em ordem",
          "body": "Mudanças em regras, índices ou esquema de saldos passam por um script que faz backup, backfill, verificação e só então publica regras e hospedagem."
        },
        {
          "title": "Testes das regras",
          "body": "As regras têm uma suíte própria contra o emulador do Firestore, rodada no CI a cada push, ao lado de flutter analyze e flutter test."
        },
        {
          "title": "Identidade visual",
          "body": "Estilo chamado Warm Envelope, com paleta, tipografia e espaçamento documentados."
        }
      ],
      "en": [
        {
          "title": "Money integrity",
          "body": "Denormalized balances protected by Firestore Security Rules, with a documented integrity model. Money math lives in pure aggregation functions, with tests."
        },
        {
          "title": "Ordered deploys",
          "body": "Changes to rules, indexes or the balances schema go through a script that backs up, backfills, verifies and only then publishes rules and hosting."
        },
        {
          "title": "Rules tests",
          "body": "The rules have their own suite against the Firestore emulator, run in CI on every push, next to flutter analyze and flutter test."
        },
        {
          "title": "Visual identity",
          "body": "A style called Warm Envelope, with documented palette, typography and spacing."
        }
      ]
    },
    "architecture": {
      "pt": "Flutter com Riverpod para estado, go_router para rotas, fl_chart para gráficos e intl para datas e moeda. Localização por arquivos ARB. Firebase (Auth e Firestore) como backend. Camadas: models, providers, services e uma pasta por funcionalidade.",
      "en": "Flutter with Riverpod for state, go_router for routing, fl_chart for charts and intl for dates and currency. Localization via ARB files. Firebase (Auth and Firestore) as backend. Layers: models, providers, services and one folder per feature."
    },
    "challenges": {
      "pt": [
        "Manter o saldo correto sob concorrência no Firestore, sem Cloud Functions, usando saldos denormalizados e regras que validam a consistência.",
        "O login com Google diverge entre Web e plataformas nativas e exige registro de uma impressão digital no console do Firebase no Android e no Windows."
      ],
      "en": [
        "Keeping the balance correct under concurrency on Firestore, without Cloud Functions, using denormalized balances and rules that validate consistency.",
        "Google sign-in differs between Web and native platforms and requires registering a fingerprint in the Firebase console on Android and Windows."
      ]
    },
    "role": {
      "pt": "Desenvolvimento mobile e web, em parceria com dois amigos.",
      "en": "Mobile and web development, in partnership with two friends."
    },
    "techs": [
      {
        "name": "Flutter",
        "desc": {
          "pt": "App multiplataforma",
          "en": "Cross-platform app"
        }
      },
      {
        "name": "Riverpod",
        "desc": {
          "pt": "Gerenciamento de estado",
          "en": "State management"
        }
      },
      {
        "name": "Firebase",
        "desc": {
          "pt": "Auth e Firestore",
          "en": "Auth and Firestore"
        }
      }
    ],
    "links": [
      {
        "kind": "landing",
        "url": "https://dindin.cafelabs.net"
      }
    ]
  },
  {
    "slug": "laudo",
    "name": "Laudo",
    "hue": 170,
    "year": "2026",
    "origin": "freela",
    "platforms": [
      "mobile",
      "web"
    ],
    "stack": [
      "Flutter",
      "Firebase",
      "Offline-first"
    ],
    "image": null,
    "subtitle": {
      "pt": "App de vistorias",
      "en": "Inspection app"
    },
    "summary": {
      "pt": "App de vistorias para uma arquiteta: narra por voz, o app transcreve no próprio aparelho, anexa fotos e gera o laudo em PDF. Funciona offline em campo.",
      "en": "Inspection app for an architect: she narrates by voice, the app transcribes on the device, attaches photos and generates the PDF report. Works offline in the field."
    },
    "context": {
      "pt": [
        "Uma arquiteta faz vistorias de obra e de imóvel e hoje não usa nenhum app para isso. O app nasceu para encurtar o caminho entre o que ela vê em campo e o laudo entregue ao cliente.",
        "Obras costumam ter sinal ruim, então o app precisa funcionar 100% offline e sincronizar quando a conexão voltar."
      ],
      "en": [
        "An architect does construction and property inspections and today uses no app for it. The app was born to shorten the path between what she sees in the field and the report delivered to her client.",
        "Construction sites often have bad signal, so the app has to work 100% offline and sync when the connection returns."
      ]
    },
    "features": {
      "pt": [
        "Vistoria organizada em dois níveis: ambiente e item.",
        "Gravação de voz por item, com transcrição automática editável e pausar e retomar.",
        "Fotos anexadas por item.",
        "Laudo em PDF gerado no próprio aparelho.",
        "Funcionamento offline completo, com sincronização via Firebase.",
        "Acesso restrito por allowlist, só para quem foi autorizado."
      ],
      "en": [
        "Inspection organized in two levels: room and item.",
        "Voice recording per item, with editable automatic transcription and pause and resume.",
        "Photos attached per item.",
        "PDF report generated on the device.",
        "Full offline operation, with sync via Firebase.",
        "Access restricted by allowlist, only for authorized users."
      ]
    },
    "decisions": {
      "pt": [
        {
          "title": "Transcrição 100% no aparelho",
          "body": "É o requisito central do produto: funcionar sem rede. Usa o reconhecimento de voz do dispositivo em português. O áudio nunca sai do aparelho."
        },
        {
          "title": "Fotos dentro do Firestore",
          "body": "As fotos são reduzidas a cerca de 1400 px, com alvo de 350 KB, e guardadas no próprio Firestore junto com os dados da vistoria."
        },
        {
          "title": "PDF no cliente",
          "body": "O laudo é gerado no Flutter, sem servidor, e por isso também funciona offline."
        },
        {
          "title": "Web sem voz",
          "body": "A versão web não grava nem transcreve: só texto manual e fotos. A captura por voz é exclusiva do mobile."
        }
      ],
      "en": [
        {
          "title": "100% on-device transcription",
          "body": "This is the product's core requirement: working without a network. It uses the device's speech recognition in Portuguese. Audio never leaves the device."
        },
        {
          "title": "Photos inside Firestore",
          "body": "Photos are reduced to about 1400 px, with a 350 KB target, and stored in Firestore itself alongside the inspection data."
        },
        {
          "title": "PDF on the client",
          "body": "The report is generated in Flutter, with no server, so it also works offline."
        },
        {
          "title": "Web without voice",
          "body": "The web version does not record or transcribe: only manual text and photos. Voice capture is mobile-only."
        }
      ]
    },
    "architecture": {
      "pt": "Flutter com Riverpod e go_router, em camadas (dados, serviços, estado, interface). Firestore e Auth no Firebase. PDF com os pacotes pdf e printing. CI no GitHub Actions com análise, 84 testes e testes das regras de segurança contra o emulador.",
      "en": "Flutter with Riverpod and go_router, in layers (data, services, state, UI). Firestore and Auth on Firebase. PDF with the pdf and printing packages. CI on GitHub Actions with analysis, 84 tests and security-rules tests against the emulator."
    },
    "challenges": {
      "pt": [
        "O desafio central do produto: a transcrição on-device aguentar o ruído de obra e o jargão técnico (trinca, infiltração, prumo, baldrame) o suficiente para economizar tempo.",
        "Dois bugs reais do Android foram achados e corrigidos antes do primeiro APK compilado ser entregue."
      ],
      "en": [
        "The product's biggest risk: on-device transcription holding up against site noise and technical jargon (cracks, seepage, plumb, footing) well enough to save time.",
        "Two real Android bugs were found and fixed before the first compiled APK was delivered."
      ]
    },
    "role": {
      "pt": "Desenvolvimento mobile, em parceria com dois amigos.",
      "en": "Mobile development, in partnership with two friends."
    },
    "techs": [
      {
        "name": "Flutter",
        "desc": {
          "pt": "Mobile e web",
          "en": "Mobile and web"
        }
      },
      {
        "name": "Firebase",
        "desc": {
          "pt": "Firestore e Auth",
          "en": "Firestore and Auth"
        }
      },
      {
        "name": "speech_to_text",
        "desc": {
          "pt": "Transcrição no aparelho",
          "en": "On-device transcription"
        }
      },
      {
        "name": "pdf + printing",
        "desc": {
          "pt": "Laudo gerado no cliente",
          "en": "Report generated on the client"
        }
      }
    ],
    "links": []
  },
  {
    "slug": "patetive",
    "name": "Patetive",
    "hue": 350,
    "year": "2026",
    "origin": "freela",
    "platforms": [
      "web"
    ],
    "stack": [
      "Next.js",
      "PWA",
      "Firebase"
    ],
    "image": "patetive",
    "subtitle": {
      "pt": "Grupos de desconto no WhatsApp",
      "en": "WhatsApp discount groups"
    },
    "summary": {
      "pt": "Diretório e operação de grupos exclusivos de desconto no WhatsApp por categoria, com curadoria e painel admin. Começa com esportes e livros.",
      "en": "Directory and operation of exclusive WhatsApp discount groups by category, with curation and an admin panel. Starts with sports and books."
    },
    "context": {
      "pt": [
        "Diretório de grupos de desconto no WhatsApp, organizado por categoria de produto. Antes de qualquer código, o produto foi validado: o mercado já tem concorrentes grandes, então a aposta é curadoria mais rigorosa, um nicho específico e grupos próprios exclusivos, em vez de volume genérico."
      ],
      "en": [
        "Directory of WhatsApp discount groups, organized by product category. Before any code, the product was validated: the market already has big competitors, so the bet is stricter curation, a specific niche and exclusive own groups, instead of generic volume."
      ]
    },
    "features": {
      "pt": [
        "Diretório por categoria, começando com produtos esportivos e livros.",
        "Site responsivo e PWA instalável, sem app nativo na v1.",
        "Painel admin próprio para cadastrar e gerenciar grupos.",
        "Contagem de cliques em Entrar no grupo e data da última verificação de cada grupo.",
        "Até duas promoções em destaque por grupo."
      ],
      "en": [
        "Directory by category, starting with sports products and books.",
        "Responsive site and installable PWA, no native app in v1.",
        "Own admin panel to register and manage groups.",
        "Click counting on Join group and a last-verified date for each group.",
        "Up to two featured promotions per group."
      ]
    },
    "decisions": {
      "pt": [
        {
          "title": "Categorias como documento",
          "body": "Uma terceira categoria no futuro não exige novo deploy."
        },
        {
          "title": "Cliques separados do grupo",
          "body": "A coleção de grupos não tem nenhum caminho de escrita pública. O contador fica em outro documento, e a regra só aceita incrementos de exatamente 1."
        },
        {
          "title": "Admin por allowlist",
          "body": "A autorização vem de uma lista explícita de admins, nunca de simplesmente estar autenticado, já que qualquer pessoa pode criar conta com a chave pública."
        },
        {
          "title": "Sem Cloud Functions",
          "body": "Toda a lógica fica no app e nas Security Rules, com App Check previsto como camada extra de proteção do contador."
        }
      ],
      "en": [
        {
          "title": "Categories as documents",
          "body": "A third category in the future requires no new deploy."
        },
        {
          "title": "Clicks separate from the group",
          "body": "The groups collection has no public write path. The counter lives in another document, and the rule only accepts increments of exactly 1."
        },
        {
          "title": "Admin by allowlist",
          "body": "Authorization comes from an explicit list of admins, never from simply being authenticated, since anyone can sign up with the public key."
        },
        {
          "title": "No Cloud Functions",
          "body": "All logic lives in the app and in the Security Rules, with App Check planned as an extra layer of protection for the counter."
        }
      ]
    },
    "architecture": {
      "pt": "Next.js (web e PWA) com Firebase: Auth, Firestore e Hosting. Coleções de categorias, grupos, cliques e admins.",
      "en": "Next.js (web and PWA) with Firebase: Auth, Firestore and Hosting. Collections for categories, groups, clicks and admins."
    },
    "challenges": {
      "pt": [
        "Medir o sucesso por taxa de clique, por grupos que continuam ativos e abaixo do limite de membros após 30 dias e por retorno de visitantes."
      ],
      "en": [
        "Measuring success by click-through rate, by groups still active and under the member limit after 30 days, and by returning visitors."
      ]
    },
    "role": {
      "pt": "Desenvolvimento full-stack, em parceria com dois amigos.",
      "en": "Full-stack development, in partnership with two friends."
    },
    "techs": [
      {
        "name": "Next.js",
        "desc": {
          "pt": "Web e PWA",
          "en": "Web and PWA"
        }
      },
      {
        "name": "Firebase",
        "desc": {
          "pt": "Auth, Firestore e Hosting",
          "en": "Auth, Firestore and Hosting"
        }
      }
    ],
    "links": [
      {
        "kind": "live",
        "url": "https://patotive.vercel.app"
      }
    ]
  }
]

export const stackFilters = ["Next.js", "React", "Flutter", "Java", "Python", "Firebase", "Supabase"] as const

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
