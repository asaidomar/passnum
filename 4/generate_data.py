# -*- coding: utf-8; -*-
#
import random
import string
import datetime
MAX_USERS = 300
MAX_STUDENT = 3000

USERS="""Tora Towner  
Carline Frisch  
Meredith Asencio  
Pamula Merrick  
Juliana Josey  
Evelia Askey  
Veronique Fouch  
Lino Thurmond  
Margorie Twiford  
Akiko Segovia  
Deetta Mccurley  
Sima Haig  
Karren Mayne  
Eddie Montag  
Tad Asaro  
Rufus Elsberry  
Maximina Bastien  
Marchelle Difilippo  
Classie Chiang  
Tu Letchworth  
Kenia Patao  
Haywood Coley  
Erin Kirsh  
Christoper Goetzinger  
Rita Mulvey  
Terrell Pleas  
Wanita Crenshaw  
Isela Bertone  
Josephine Boudreaux  
Christinia Burgett  
Harriet Bliss  
Neta Bickham  
Darcy Vasquez  
Francene Boyles  
Manie Ballerini  
Rafael Emmons  
Nelson Landen  
Joselyn Mcelrath  
Karly Westfield  
Lillia Zahl  
Anamaria Duffer  
Keli Sartor  
Monika Baro  
Pearline Moad  
Parthenia Trivett  
Barb Chittenden  
Emogene Withey  
Carolynn Staller  
Janey Sparks  
Kimiko Danziger
Idella Frase  
Valrie Selden  
Stasia Holdeman  
Page Bosak  
Lajuana Catoe  
Joaquin Keech  
Ulysses Molton  
Dorthey Stegall  
Luann Braz  
Elmira Hamlin  
Janiece Lorenzana  
Vincenzo Master  
Mercy Oelke  
Halina Pisano  
Britni Pineo  
Robyn Mcquaid  
Esta Plumber  
Mina Kolman  
Graig Neuhaus  
Margareta Mathers  
Stephany Stonebraker  
Saturnina Teasley  
Ed Haymaker  
Caryn Pickles  
Daniela Guse  
Gabriella Dahn  
Laquanda Sytsma  
Boyd Ranger  
Stefania Grays  
Wallace Rudy  
Sandie Haith  
Ricardo Maddock  
Ayesha Redmond  
Piedad Leggio  
Hettie Rardin  
Arica Winder  
Eileen Dolloff  
Ilona Jovel  
Maren Hanzlik  
Jamel Luna  
Kathleen Speight  
Stanford Cooney  
Miriam Aarons  
Dulcie Staff  
Rosalba Rutigliano  
Carmelita Steil  
Lincoln Abell  
Gerda Scheck  
Kazuko Sears  
Shanti Saucier"""


def generate_room():
    with open("salle.txt", "w") as fout:
        print("id_batiment\tid_salle\tnum_salle\tcapacite_salle\tpossede_tableau\tpossede_retro", file=fout)
        i = 0
        for id_bat in range(1, 10):
            for id_salle in range(1, 30):
                i += 1
                capacite_salle = random.randint(30, 300)
                has_board = random.choice([0, 1])
                has_proj = random.choice([0, 1])
                print( "%s\t%s\t%s\t%s\t%s\t%s" % (id_bat, i, i, capacite_salle, has_board, has_proj), file=fout)

def generate_promo():
    id_promos = []
    promos = ["promo 2017", "promo 2016", "promo 2015",
              "Math Spe 2017", "Math Spe 2016",
              "Chimie Spe 2017", "Chimie Spe 2016",
              "Micro Elect 2017", "Micro Elect 2016",
              "Passnum 2017"]

    with open("promo.txt", "w") as fout:
        print("id_promo\tid_ecole\tid_responsable\tannee\tspecialite", file=fout)
        for i, promo in enumerate(promos, start=1):
            id_resp = random.randint(1, MAX_USERS)
            parts = promo.split()
            year = parts.pop()
            spe = " ".join(parts)
            if spe == 'promo':
                spe = ""
            print("%s\t1\t%s\t%s\t%s" % (i, id_resp, year, spe), file=fout)
            id_promos.append(i)
    return id_promos

def get_random_num(long_=10):

    return "".join([ str(random.randint(0, 9)) for _ in range(long_)])


def gen_ban():
    # DE89 3704 0044 0532 0130 00
    return random.choice(string.ascii_uppercase) + random.choice(string.ascii_uppercase) + get_random_num(long_=20)


def generate_users():
    full_names = USERS.split()
    with open("personnel.txt", "w") as fout:
        print("id_personnel\tid_responsable\tnom\tprenom\tid_secu\tstatus\tnum_banque\tdate_entree\tdate_sortie", file=fout)
        for i  in range(2, MAX_USERS+2):
            id_resp = random.choice([""] + list(range(1, 10)) )
            f_name, l_name = random.choice(full_names),  random.choice(full_names)
            num_secu = get_random_num(15)
            status = random.choice(["Interne", "Vacataire", "Prestataire"])
            before = datetime.timedelta(days=365 * random.randint(1, 30))
            entree = datetime.datetime.utcnow() - before

            raw = [i, id_resp, l_name.upper(), f_name.title(),
                   num_secu, status, gen_ban(),
                   entree.strftime("%d/%m/%Y"), "NA"]

            print("\t".join(str(s) for s in raw), file=fout)


def generate_student(id_promos):

    names = USERS.split()

    with open("etudiant.txt", "w") as fout:
        print("id_etudiant,id_promo,nom,prenom,id_secu,num_banque, age".replace(',', "\t"), file=fout)
        for i in range(1, MAX_STUDENT + 1):
            f_name, l_name = random.choice(names),  random.choice(names)
            num_secu = get_random_num(15)
            id_promo =random.choice(id_promos)
            age = random.randint(18, 31)
            raw = [i, id_promo, l_name.upper(), f_name.title(), num_secu, gen_ban(), age]
            print("\t".join(str(s) for s in raw), file=fout)

def generate_service_user():
    services = "Informatique,Enseignement,Scolarité,Gestion,Direction,RH,Relation Entreprise,Recherche".split(",")
    roles = "Directeur,Responsable,Collaborateur".split(",")
    roles_prof = "Mathematiques,Informatique,Chimie,Sciences Sociales,Mecanique,Physique".split(",")

    with open("service_user.txt", "w") as fout:
        print("\t".join(["id_personnel", "id_service", "role"]), file=fout)
        for i in range(1, MAX_USERS + 1):
            # prof poids x10
            id_service = random.choice(list(range(1, len(services) + 1)) + [services.index("Enseignement") + 1] * 10)
            if id_service == (services.index("Enseignement") + 1):
                role = "Professeur " + random.choice(roles_prof)
            else:
                role = random.choice(roles)
            raw = [i, id_service, role]
            print("\t".join(str(s) for s in raw), file=fout)




def main():
    generate_room()
    id_promos = generate_promo()
    generate_users()
    generate_student(id_promos)
    generate_service_user()

if __name__ == '__main__':
    main()
