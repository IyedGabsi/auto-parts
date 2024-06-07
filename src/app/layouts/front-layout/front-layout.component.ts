import { Component,EventEmitter,Input,Output, ViewChild} from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RouterModule } from '@angular/router';
import { SearchService } from '../../views/services/search.service';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';

@Component({
  selector: 'app-front-layout',
  standalone: true,
  imports: [HeaderComponent,RouterModule,NzCollapseModule],
  templateUrl: './front-layout.component.html',
  styleUrl: './front-layout.component.scss'
})
export class FrontLayoutComponent {
  activeId:any
 
  panels = [
    {
      active: false,
      name: 'Général',
      childPanel: [
        {
          active: false,
          name: 'Quels types de produits vendez-vous ?',
          content:' Nous proposons une large gamme de pièces détachées pour autos, vélos, tracteurs, camions, camping-cars, motos, scooters et trottinettes. '
        },
        {
          active: false,
          name: 'Comment puis-je trouver une pièce spécifique sur votre site ?',
          content:'  Utilisez notre barre de recherche en haut de la page et entrez le nom ou le numéro de la pièce. Vous pouvez également naviguer par catégorie en utilisant le menu de notre site.          '
        }
      ]
    },
    {
      active: false,
      name: 'Commande et Livraison',
      childPanel: [
        {
          active: false,
          name: 'Quels sont les délais de livraison ?          ',
          content:'Les délais de livraison varient en fonction de la destination et de la disponibilité des pièces. En général, la livraison prend entre 3 et 7 jours ouvrables.          '
        },
        {
          active: false,
          name: 'Quels sont les frais de livraison ?          ',
          content:'Les frais de livraison dépendent du poids et de la taille de la commande ainsi que de la destination. Vous pouvez voir les frais de livraison exacts au moment de finaliser votre commande.          '
        },
        {
          active: false,
          name: 'Puis-je suivre ma commande ?          ',
          content:'Oui, dès que votre commande est expédiée, nous vous enverrons un email avec un numéro de suivi et un lien pour suivre votre colis en ligne.     '
        }
      ]
    },
    {
      active: false,
      name: 'Paiement',
      childPanel: [
        {
          active: false,
          name: ' Est-ce que vos paiements en ligne sont sécurisés ?          ',
          content:'Oui, tous nos paiements en ligne sont sécurisés par des protocoles de cryptage SSL.          '
        },
        {
          active: false,
          name: 'Quels modes de paiement acceptez-vous ?          ',
          content:'Nous acceptons les paiements par carte de crédit (Visa, MasterCard, American Express), PayPal, et virement bancaire.          '
        }
      ]
    },

    {
      active: false,
      name: 'Retours et Garanties',
      childPanel: [
        {
          active: false,
          name: 'Quelle est votre politique de retour ?          ',
          content:'Vous pouvez retourner les produits non utilisés dans leur emballage d’origine dans les 30 jours suivant la réception pour un remboursement complet. Les frais de retour sont à la charge du client.          '
        },
        {
          active: false,
          name: 'Les pièces détachées sont-elles garanties ?          ',
          content:'Oui, toutes nos pièces détachées sont garanties contre les défauts de fabrication pendant une période de 12 mois à compter de la date d’achat.          '
        }
      ]
    },
    {
      active: false,
      name: 'Assistance et Support',
      childPanel: [
        {
          active: false,
          name: 'Offrez-vous des conseils pour l’installation des pièces ?',
          content:'Oui, nous avons une section de guides et tutoriels sur notre site pour vous aider à installer vos pièces. Vous pouvez également contacter notre service client pour obtenir des conseils personnalisés.'
        }
      ]
    },
    
  ];

  constructor(private ss:SearchService){}
  getId(id:any){
    // this.activeId=id
    // if(id=1)
  }
  
 
  onApplySearch(keyword: any): void {
    this.ss.setSearchKeyword(keyword);
  }
}
