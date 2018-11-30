playlist segmentée par paquet de 100Mo


    Si new playlist ouverte pendant qu'une autre n'a pas finit de charger



    Si app online
      Si playlist ouverte
          Si .psp existe pas
              créer .psp
              ajouter playlist metadata au header du .psp
              référencer playlist dans psp-ref.json
          Récup les metadata des musics depuis le header du .psp
          Pour chaque music dans la playlist
              Afficher music
              Si la music est pas dans les metadata recup depuis le header du .psp
                  ajouter les metadata de la music au header
                  set isAvailableOffline à false dans header
              Si isAvailableOffline == false
                  afficher offline ok icon
              Sinon
                  afficher offline ko  icon

    Si playlist créée
        créer .psp
        ajouter playlist metadata au header du .psp
        référencer playlist dans psp-ref.json

    Si app offline
        Recup le noms des .psp files depuis le fichier psp-ref.json
        Pour chaque nom
            Récup les metadata de la playlist associé au .psp

    Si (app offline et playlist ouverte) || ( app online et playlist ouverte et mode offline)
        Charger .psp
        Récup les metadata des musics depuis le header du .psp
        Pour chaque music
            Afficher la music
            Si isAvailableOffline == false
                grisonner la music depuis le css
                Si app online
                    Afficher dl icon
                    Si dl icon clicked
                        télécharger la musique
                        empaqueter la musique dans .psp
                        Lors de l'empaquetage
                            Si Echec
                                backup
                            Si app exit
                                Si temps estimer < 1s
                                    attendre la fin et quitter
                                Sinon
                                    fenetre popup attendre la fin ou quitter brusquement
                                    Si quitter
                                        backup
                        Set isAvailableOffline à true dans header
            Sinon
                Si Music cliquée
                    extraire music du .psp
                    lire la music dans mediaplayer
