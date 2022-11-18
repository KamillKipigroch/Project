package CosplayCostumes;

import CosplayCostumes.rest.model.*;
import CosplayCostumes.rest.repostitory.*;
import CosplayCostumes.security.user.model.User;
import CosplayCostumes.security.user.model.UserRole;
import CosplayCostumes.security.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;

@Configuration
public class LoadDatabase {
    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);
    private static final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Bean
    CommandLineRunner initDatabase(SubCategoryRepository subCategoryRepository, CategoryRepository categoryRepository, ProductTypeRepository productTypeRepository,
                                   QualityRepository qualityRepository, ConditionRepository conditionRepository, UserRepository userRepository, OrderStatusRepository orderStatusRepository) throws Exception {

        return args -> {

            if (categoryRepository.findAll().isEmpty()) {
                log.info("Preloading " + categoryRepository.save(new Category("Anime")));
                log.info("Preloading " + categoryRepository.save(new Category("Movie")));
                log.info("Preloading " + categoryRepository.save(new Category("Series")));
                log.info("Preloading " + categoryRepository.save(new Category("Game")));
                log.info("Preloading " + categoryRepository.save(new Category("Other")));
            }

            if (subCategoryRepository.findAll().isEmpty()) {
                //Anime

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Haikyuu!!", "There are not many sports anime that can knock it out of the park in almost every way but Haikyuu!! " +
                        "manages to do that. The series revolves around a fairly large ensemble consisting of a high school volleyball team. ",
                        categoryRepository.findByCode("Anime").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Trigun", "Trigun is a classic late 90s sci-fi space Western taking place on a desert planet literally called, No Man's Land." +
                        " The Protagonist, Vash the Stampede isn't your typical strong and stoic gunslinger. ",
                        categoryRepository.findByCode("Anime").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Dragon Ball Z", "Dragon Ball Z was a gateway drug for many a young anime fan, and for good reason." +
                        " The series isn't particularly deep, as it basically revolves around superhuman martial artist Goku and his friends testing their mettle against an increasingly powerful and outlandish series of foes.",
                        categoryRepository.findByCode("Anime").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Naruto Shippuden", "The long-running Naruto series has been referred to as one of the “big three” " +
                        "anime because of its wild popularity around the world, and for good reason. It’s full of action-packed fight sequences, hilariously fun moments, and dramatic scenes that pull at your heartstrings.",
                        categoryRepository.findByCode("Anime").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Death Note", "Death Note is a now classic anime that follows Light Yagami," +
                        " a teen who gains supernatural abilities via the Death Note. A book that grants the user the ability to kill anyone they want, just by writing that person’s name in the book. ",
                        categoryRepository.findByCode("Anime").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Devilman Crybaby", "Unlike most of Netflix's original programming, Devilman Crybaby offers a succinct and moving story in the span of 10 episodes." +
                        " But be warned, Devilman Crybaby is sure to make younger viewers with parents in the room extremely uncomfortable with its explicit depictions of sex, violence, and profanity. ",
                        categoryRepository.findByCode("Anime").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Demon Slayer", "The record-breaking Demon Slayer has blown up tremendously in the last " +
                        "few years and it’s not too surprising to those that have followed the series up until now. ",
                        categoryRepository.findByCode("Anime").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Yu Yu Hakusho", "We follow Yusuke Urameshi, a 14-year-old teenage delinquent who is hit by a car and dies saving a child. " +
                        "Yusuke finds out that he has no place in heaven or hell, but he's offered a second chance at life when he's charged with investigating supernatural activity in the Human World and given the title of Spirit World Detective. ",
                        categoryRepository.findByCode("Anime").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Hajime no Ippo", "Also known in the US as Fighting Spirit, Hajime no Ippo is a thrilling adaptation of an incredibly long-running manga series. " +
                        "Picture a mashup of Rocky and The Karate Kid and you’ll have some idea of what to expect from this coming-of-age drama about a bullied teen named Ippo Makunouchi who discovers he has a knack for boxing.",
                        categoryRepository.findByCode("Anime").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Fullmetal Alchemist: Brotherhood", "The struggle of most anime is laying out intricate world-building while balancing a cast of memorable characters, iconic moments, and thrilling fights. " +
                        "And that's what makes Fullmetal Alchemist: Brotherhood so special. The framing device for our entry into this sprawling world is one of sympathy. We understand why the Elric brothers would practice forbidden alchemy in an attempt to resurrect their dead mother at the cost of their physical bodies.",
                        categoryRepository.findByCode("Anime").orElse(null))));


                //Movie

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("It The Movie",
                        "After recent cases of disappearing local kids in the town of Derry, Maine, IT follows a group of kids dubbed The Losers' Club in the summer of 1989 and their discovery and scary encounters of a shape-shifting demonic entity, known to return every 27 years and preys on your own personal fears.",
                        categoryRepository.findByCode("Movie").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Ghostbusters",
                        "Three odd-ball scientists get kicked out of their cushy positions at a university in New York City where they studied the occult. They decide to set up shop in an old firehouse and become Ghostbusters, trapping pesky ghosts, spirits, haunts, and poltergeists for money.",
                        categoryRepository.findByCode("Movie").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Witch",
                        "In fairy stories, a witch is a woman, usually an old woman, who has evil magic powers. Witches often wear a pointed black hat, and have a pet black cat. 2. countable noun. A witch is someone who claims to have magic powers and to be able to use them for good or bad purposes.",
                        categoryRepository.findByCode("Movie").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Freddy Krueger",
                        "The spirit of a dead child-killer, Freddy is best known for being able to terrorize kids in their dreams based on their fears, and kill them. He has a set of visual trademarks including a burn-scarred face, a fedora-like wide-brim hat, a knife-fingered glove, and a red and green",
                        categoryRepository.findByCode("Movie").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Jason Friday the 13th",
                        "Jason had superhuman strength and was tough to destroy, despite shootings, stabbings and axes to the head. He apparenty died a number of times but was brought back to life by a lightning bolt, by a girl with telekinetic powers and by a submerged power cable.",
                        categoryRepository.findByCode("Movie").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Chucky doll",
                        "Chucky is portrayed as a vicious serial killer who, as he bleeds out from a gunshot wound, transfers his soul into a \"Good Guy\" doll and continuously tries",
                        categoryRepository.findByCode("Movie").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Harry Potter",
                        "Throughout the series, Harry is described as having his father's perpetually untidy black hair, his mother's bright green eyes, and a lightning bolt-shaped scar on his forehead. He is further described as \"small and skinny for his age\" with \"a thin face\" and \"knobbly knees\", and he wears Windsor glasses.",
                        categoryRepository.findByCode("Movie").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Star Wars",
                        "A space opera set “a long time ago in a galaxy far, far away,” the film centres on Luke Skywalker (played by the then relatively unknown Mark Hamill), a young man who finds himself embroiled in an interplanetary war between an authoritarian empire and rebel forces",
                        categoryRepository.findByCode("Movie").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Avatar",
                        "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home. When his brother is killed in a robbery, paraplegic Marine Jake Sully decides to take his place in a mission on the distant world of Pandora.",
                        categoryRepository.findByCode("Movie").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Godzilla",
                        "",
                        categoryRepository.findByCode("Movie").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Godzilla",
                        "What is Godzilla? Godzilla is a fictional, dinosaur-like, monster that has atomic breath. Godzilla looks a bit like a tyrannosaurus rex (it has tiny arms) and its back is lined with armored plates, looking look like big bony maple.",
                        categoryRepository.findByCode("Movie").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Terminator",
                        "The Terminator is a formidable robotic assassin and soldier, designed by the military supercomputer Skynet for infiltration and combat duty, towards the ultimate goal of exterminating the Human Resistance.",
                        categoryRepository.findByCode("Movie").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Shrek",
                        "Shrek, animated cartoon character, a towering, green ogre whose fearsome appearance belies a kind heart. Shrek is the star of a highly successful series of animated films. At the beginning of the 2001 film Shrek, the title character lives as a recluse in a remote swamp in the fairy-tale land of Duloc.",
                        categoryRepository.findByCode("Movie").orElse(null))));


                //Series

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Game of Thrones",
                        "In the Game of Thrones, you either win or you die. In the mythical continent of Westeros, nine families of higher nobility (Targaryen, Lannisters, Starks, Tyrell, Martell, Greyjoys, Baratheons and Boltons) scramble bitterly to gain power over the seven kingdoms and the Iron throne.",
                        categoryRepository.findByCode("Series").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Money Heist",
                        "Eight thieves take hostages and lock themselves in the Royal Mint of Spain as a criminal mastermind manipulates the police to carry out his plan. Watch all you want. This riveting crime series won Best Drama at the International Emmy Awards, Premios Fénix and Premios Iris (plus six more Iris wins).",
                        categoryRepository.findByCode("Series").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Squid Game",
                        "Squid Game, which started streaming on Sept. 17, focuses on a desperately indebted group of people in South Korea. They're first tricked into a deadly tournament of children's games, but then many of them volunteer to come back, realizing the games may be their only chance to win the money they need to survive.",
                        categoryRepository.findByCode("Series").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Stranger Things",
                        "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl. Watch all you want. This nostalgic nod to '80s sci-fi and horror classics has earned dozens of Emmy nominations, including three for Outstanding Drama.",
                        categoryRepository.findByCode("Series").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Star Trek",
                        "tar Trek was created by American writer and producer Gene Roddenberry and chronicles the exploits of the crew of the starship USS Enterprise, whose five-year mission is to explore space and, as stated in the title sequence, “to seek out new life and new civilizations, to boldly go where no man has gone before.",
                        categoryRepository.findByCode("Series").orElse(null))));


                //Game

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("League of Legends",
                        "League of Legends is one of the world's most popular video games, developed by Riot Games. It features a team-based competitive game mode based on strategy and outplaying opponents.",
                        categoryRepository.findByCode("Game").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("The Witcher",
                        "The Witcher: Wild Hunt is a story-driven open world RPG set in a visually stunning fantasy universe full of meaningful choices and impactful consequences. " +
                                "In The Witcher, you play as professional monster hunter Geralt of Rivia tasked with finding a child of prophecy in a vast open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns to explore.",
                        categoryRepository.findByCode("Game").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Dead by Daylight",
                        "Death Is Not an Escape.\n" +
                                "Dead by Daylight is a multiplayer (4vs1) horror game where one player takes on the role of the savage Killer," +
                                " and the other four players play as Survivors, trying to escape the Killer and avoid being caught, tortured and killed.",
                        categoryRepository.findByCode("Game").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Farming Simulator 22",
                        "Take on the role of a modern farmer! Agriculture, animal husbandry and forestry offer a huge variety of" +
                                " farming activities while you face the challenges of the four seasons, especially when winter sets in. ",
                        categoryRepository.findByCode("Game").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Red Dead Redemption",
                        "Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels," +
                                " the gang must rob, steal and fight their way across the rugged heartland of America in order to survive.",
                        categoryRepository.findByCode("Game").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Gothic",
                        "War has been waged across the kingdom of Myrtana. Orcish hordes invaded human territory and the king of the land needed a lot of ore to forge enough weapons, " +
                                "should his army stand against this threat. Whoever breaks the law in these darkest of times is sentenced to serve in the giant penal colony of Khorinis, mining the so much needed ore.",
                        categoryRepository.findByCode("Game").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("The Elder Scrolls",
                        "The Anniversary Upgrade includes pre-existing and new Creation Club content like quests, dungeons, bosses, weapons, spells, and more. " +
                                "With Creations, there is a lot more to discover. You must own Skyrim Special Edition to access this content.",
                        categoryRepository.findByCode("Game").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory("Valorant",
                        "CREATIVITY IS YOUR MOST POWERFUL WEAPON.\n" +
                                "It is not only weapons and projectiles that count here - there are agents with adaptive, fast and deadly skills that will create the conditions for you to demonstrate your shooting skills. Agents differ from each other, making each replay one-of-a-kind.",
                        categoryRepository.findByCode("Game").orElse(null))));


                //Other

                log.info("Preloading " + subCategoryRepository.save(new Subcategory(
                        "Animals",
                        "",
                        categoryRepository.findByCode("Other").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory(
                        "Celebrities",
                        "",
                        categoryRepository.findByCode("Other").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory(
                        "Christmas",
                        "",
                        categoryRepository.findByCode("Other").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory(
                        "Dragons",
                        "",
                        categoryRepository.findByCode("Other").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory(
                        "Fairy",
                        "",
                        categoryRepository.findByCode("Other").orElse(null))));

                log.info("Preloading " + subCategoryRepository.save(new Subcategory(
                        "Sexy",
                        "",
                        categoryRepository.findByCode("Other").orElse(null))));
            }

            if (productTypeRepository.findAll().isEmpty()) {
                log.info("Preloading " + productTypeRepository.save(new ProductType("Costumes")));
                log.info("Preloading " + productTypeRepository.save(new ProductType("Accessories")));
                log.info("Preloading " + productTypeRepository.save(new ProductType("Party Supplies")));
                log.info("Preloading " + productTypeRepository.save(new ProductType("Hats & Headwear")));
                log.info("Preloading " + productTypeRepository.save(new ProductType("Decorations")));
                log.info("Preloading " + productTypeRepository.save(new ProductType("Accessory Kits")));
            }

            if (qualityRepository.findAll().isEmpty()) {
                log.info("Preloading " + qualityRepository.save(new Quality("Silver Standard")));
                log.info("Preloading " + qualityRepository.save(new Quality("Gold Vip")));
                log.info("Preloading " + qualityRepository.save(new Quality("Platinum Premium")));
            }

            if (conditionRepository.findAll().isEmpty()) {
                log.info("Preloading " + conditionRepository.save(new Condition(100, "Super Hero")));
                log.info("Preloading " + conditionRepository.save(new Condition(80, "Hero from big city")));
                log.info("Preloading " + conditionRepository.save(new Condition(50, "Neighborhood Hero")));
            }

            if (userRepository.findAll().isEmpty()) {
                log.info("Preloading " + userRepository.save(new User("admin@admin.pl", bCryptPasswordEncoder.encode("admin@admin.pl"), UserRole.Admin)));
                log.info("Preloading " + userRepository.save(new User("user@user.pl", bCryptPasswordEncoder.encode("user@user.pl"), UserRole.User)));
            }

            if (orderStatusRepository.findAll().isEmpty()) {
                log.info("Preloading " + orderStatusRepository.save(new OrderStatus("In realization", 1)));
                log.info("Preloading " + orderStatusRepository.save(new OrderStatus("Completed", 2)));
                log.info("Preloading " + orderStatusRepository.save(new OrderStatus("Cancelled", 3)));
            }
        };
    }
}
