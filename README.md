# Teljesítményértékelő rendszer tesztfeladat

## Leírás

Az alkalmazás egy egyszerű teljesítményértékelő rendszer, amelyben az értékelő vezetők értékelik a beosztottak teljesítményét. Az értékelők a beosztottakhoz időszakos értékeléseket rendelhetnek, melyek kpi-kat/célokat, ezek prioritását valamint eredményét tartalmazzák. Az értékelési szempontok alapján a rendszer kiszámolja a beosztottak teljesítményét az értékelt időszakban.

## Stack

- Adatbázis: MongoDB
- Backend: Node.js, Express.js
- Frontend: Angular 14

# Indítás

Az alkalmazás indításához nodejs futtatókörnyezet, valamint MongoDB adatbázis szükséges. A MongoDB adatbázisnak el kell indulnia a backend indítása előtt. Az alkalmazás kiszolgálja a frontendet is, így a frontend indítása nem szükséges.
Az alkalmazás elindítása előtt az "api" mappában a következő parancs kiadása szükséges:

```npm install```

Az alkalmazás elindítása ugyanebben a mappában állva következő paranccsal történik:

```npm run start```

Amennyiben az adatbázis üres, a backend automatikusan feltölti a rendszert tesztadatokkal.

A parancs kiadása után az alkalmazás a http://localhost:3000 címen érhető el.

Az API swagger dokumentációja a http://localhost:3000/api/api-docs címen érhető el.

Az adatbázisban elérhető felhasználók:
- Felhasználónév: Supervisor1, jelszó: pw

# Entitások

### Munkavállaló (Employee)

A munkavállalók rendelkeznek törzsszámmal, értékelő vezetővel, névvel, munkakörrel, valamint hozzárendelt értékelésekkel.

### Vezető (Supervisor)

A vezetők rendelkeznek felhaszbálónévvel, jelszóval, valamint hozzárendelt beosztottakkal.

### Értékelés (Review)

Az értékelések rendelkeznek munkavállalóval, időszakkal, kpi-kkal/célokkal, melyek egy leírásból, prioritásból és értékelésből állnak, valamint egy összesített eredménnyel.

# Képernyők

## Bejelentkezés

A bejelentkezési képernyőn a vezetők bejelentkezhetnek a rendszerbe. A bejelentkezéshez felhasználónév és jelszó megadása szükséges. A bejelentkezés sikeres befejezése után a vezető a munkavállalókat listázó képernyőre kerül.

## Munkavállalók listázása

A munkavállalók listázása képernyőn a vezetők listázhatják a hozzájuk rendelt munkavállalókat.
A munkavállalók listája táblázatos formában történik, a sorok végén található "Értékelések" gombbal a munkavállalóhoz tartozó értékelések oldalára navigálhatunk.

## Munkavállalók hozzáadása

A menüben elérhetó "Munkavállaló hozzáadása" gombra kattintva a vezetők új munkavállalókat adhatnak hozzá a rendszerhez. A munkavállalók hozzáadása képernyőn a munkavállalók törzsszámát, nevét, munkakörét adhatjuk meg.
A munkavállaló hozzáadása gombra kattintva, majd a felugró értesítést elfogadva a munkavállaló hozzáadódik az adatbázishoz.

## Munkavállaló értékelései

A munkavállaló értékelései oldalon a vezetők listázhatják a kiválasztott munkavállalóhoz tartozó értékeléseket. Az értékelések listája tartalmazza az értékelések időszakát, valamint végeredményét.
A sorok végén található "Részletek" gombbal az értékelés részleteinek oldalára navigálhatunk.
Az oldal tetején található "Értékelés hozzáadása" gombbal új értékelést adhatunk hozzá a munkavállalóhoz.

## Értékelés részletei

Az értékelés részletei oldalon a vezetők megtekinthetik az értékelés részleteit. Itt a célok láthatók táblázatos formában, melyek tartalmazzák a célok leírását, prioritását, valamint értékelését, az utolsó sor pedig az összesített eredményt tartalmazza. A vissza gombbal visszatérhetünk az értékelések listájához.

## Értékelés hozzáadása

Az értékelés hozzáadása oldalon egy értékelőlap kitöltésével adhatunk hozzá új értékelést a munkavállalóhoz. Az értékeléshez tartozó célok száma tetszőleges, a "Cél hozzáadása" gombbal új célokat adhatunk hozzá az értékeléshez, a sorok végén található "eltávolítás" gombbal pedig törölhetjük a célokat. Az értékelőlap kitöltése után az "Értékelés hozzáadása" gombbal menthetjük el az értékelést, majd a felugró értesítést elfogadva az értékelés hozzáadódik az adatbázishoz.
