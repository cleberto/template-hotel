export interface Review {
  id: string
  author: string
  avatar: string
  rating: number
  time: string
  text: string
}

export interface ReviewsPayload {
  rating: number
  total: number
  url: string
  reviews: Review[]
}

/** Mesmo formato retornado por functions/api/reviews.ts */
export const mockReviews: ReviewsPayload = {
  rating: 4.9,
  total: 1287,
  url: '',
  reviews: [
    { id: 'm1', author: 'Mariana Albuquerque', avatar: '', rating: 5, time: '2 semanas atrás', text: 'Lugar mágico! Acordamos todos os dias com a vista das piscinas naturais. O café da manhã com tapioca e cuscuz é imperdível e a equipe é extremamente atenciosa. Já queremos voltar.' },
    { id: 'm2', author: 'James Whitfield', avatar: '', rating: 5, time: 'a month ago', text: 'Best boutique hotel we stayed at in Brazil. The beachfront bungalow with the plunge pool was pure bliss, and the concierge organized a perfect jangada trip at low tide.' },
    { id: 'm3', author: 'Rafael Monteiro', avatar: '', rating: 5, time: '3 semanas atrás', text: 'Atendimento impecável do check-in ao check-out. O spa com óleo de coco é maravilhoso e a moqueca do restaurante é a melhor que comi em Porto.' },
    { id: 'm4', author: 'Lucía Fernández', avatar: '', rating: 5, time: 'hace 2 meses', text: 'Un paraíso. La suite vista al mar es preciosa, todo muy limpio y con muchísimo gusto. El personal nos ayudó con todas las excursiones. ¡Volveremos!' },
    { id: 'm5', author: 'Camila Rocha', avatar: '', rating: 4, time: '1 mês atrás', text: 'Hotel lindo, aconchegante e muito bem localizado, dá para ir a pé até a vila. Só achei o estacionamento um pouco pequeno, mas o resto compensa demais.' },
    { id: 'm6', author: 'Thomas Becker', avatar: '', rating: 5, time: '2 months ago', text: 'Peaceful, stylish and genuinely warm hospitality. Sunset at Maracaípe arranged by the hotel was a highlight of our honeymoon.' },
  ],
}
